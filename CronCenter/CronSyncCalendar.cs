using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Policy;
using System.Security.Principal;
using System.Text;
using Coravel.Invocable;
using gitlabCalendar.Models;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace gitlabCalendar.CronCenter
{
    public class CronSyncCalendar : IInvocable
    {

        public Task Invoke()
        {
            Log.Information("开始定时同步任务!");

            string IniPath = Convert.ToString(AppDomain.CurrentDomain.BaseDirectory) + "Config.ini";
            IConfiguration config = new ConfigurationBuilder()
                       .AddIniFile(IniPath)
                       .Build();
            IConfigurationSection section = config.GetSection("GitLabCalendar");
            var gitlabUser = new Models.GitLabAccount(section["EndPoint"], section["User"], section["Password"]);

            Log.Information("开始执行 GitLab 登录任务");

            var getResultTask = GitLabOperation.GetAuthTokenAsync(gitlabUser.Endpoint);
            var getResult = getResultTask.Result;
            if (getResult.Restult)
            {
                Log.Information("请求 GitLab 登录页成功");
                Log.Information($"Result: {getResult.Message}");
                gitlabUser.Session = getResult.Message.Split("&")[0];
                gitlabUser.AuthenticityToken = getResult.Message.Split("&")[1];
                Log.Information($"开始登录 GitLab @{gitlabUser.Endpoint}...");

                var getLoginTask = GitLabOperation.GitLabLoginAsync(gitlabUser);
                var getLoginResult = getLoginTask.Result;

                if (getLoginResult.Restult)
                {
                    Log.Information("GitLab 登录成功");
                    Log.Information($"Result: {getLoginResult.Message}");
                    gitlabUser.RemeberMeToken = getLoginResult.Message;
                    var getCalendarTask = GitLabOperation.GetGitLabCalendarAsync(gitlabUser);
                    var getCalendarResult = getCalendarTask.Result;

                }
                else
                {
                    Log.Error("GitLab 登录失败!");
                    Log.Error($"失败原因: {getResult.Message}");
                }

            }
            else
            {
                Log.Error("请求 GitLab 登录页失败!");
                Log.Error($"失败原因: {getResult.Message}");
            }

            return Task.CompletedTask;
        }
    }

    public class GitLabOperation
    {
        //private  readonly HttpClient client = new HttpClient();
        public static async Task<RequestResult> GetAuthTokenAsync(string endpoint)
        {
            var requestResult = new RequestResult();
            var cookieContainer = new CookieContainer();
            var handler = new HttpClientHandler();
            handler.CookieContainer = cookieContainer;

            var client = new HttpClient(handler);
            try
            {
                Log.Information($"GitLab Endpoint:{endpoint}");
                Log.Information($"GitLab Login Page:{endpoint + "users/sign_in"}");
                var response = await client.GetAsync(endpoint + "users/sign_in");
                Log.Information($"response code:{response.StatusCode}");
                response.EnsureSuccessStatusCode();
                var responseContent = await response.Content.ReadAsStringAsync();
                //# new_user > input[type=hidden]:nth-child(2)
                var htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(responseContent);
                var authNode = htmlDoc.DocumentNode
                // Use XPath
                // <input type="hidden" name="authenticity_token" value="xxx">
                .SelectSingleNode("//*[@id=\"new_user\"]/input[2]");
                Log.Debug($"AuthNode:{authNode.Name}");
                //.Attributes["authenticity_token"].Value;
                Log.Debug($"AuthNode.Attributes.Count:{authNode.Attributes.Count}");
                if (authNode.Attributes.Count > 0)
                {
                    IEnumerable<string> setCookieHeaders;
                    if (response.Headers.TryGetValues("Set-Cookie", out setCookieHeaders))
                    {
                        foreach (var setCookieHeader in setCookieHeaders)
                        {
                            Log.Information($"cookie:{setCookieHeader}");
                            if (setCookieHeader.StartsWith("_gitlab_session="))
                            {
                                var cookiesWithoutHeader = setCookieHeader.Split("_gitlab_session=")[1];
                                cookiesWithoutHeader = cookiesWithoutHeader.Split(";")[0];
                                Log.Information($"Session:{cookiesWithoutHeader}");
                                requestResult.Message = cookiesWithoutHeader + "&";
                            }
                        }
                    }
                    foreach (var attr in authNode.Attributes)
                    {
                        Log.Debug($"AuthNode.Attributes:{attr.Name}-{attr.Value}");
                        if (attr.Name == "value")
                        {
                            Log.Information($"GitLab 返回 AuthCode: {attr.Value}");
                            requestResult.Restult = true;
                            requestResult.Message += attr.Value;
                            return requestResult;
                        }
                    }
                }
                requestResult.Restult = false;
                requestResult.Message = "没有找到 AuthCode 元素";
                return requestResult;
            }
            catch (HttpRequestException ex)
            {
                requestResult.Restult = false;
                requestResult.Message = "拉取 GitLab 页面时请求失败(网络原因):" + ex.Message;
                return requestResult;
            }
            catch (Exception ex)
            {
                requestResult.Restult = false;
                requestResult.Message = "拉取 GitLab 页面时请求失败:" + ex.Message;
                return requestResult;
            }
            finally { client.Dispose(); }

        }
        public static async Task<RequestResult> GitLabLoginAsync(Models.GitLabAccount account)
        {
            var cookieContainer = new CookieContainer();
            var uri = new Uri(account.Endpoint + "users/sign_in");
            cookieContainer.SetCookies(uri, "_gitlab_session=" + account.Session);
            var handler = new HttpClientHandler();
            handler.CookieContainer = cookieContainer;

            var client = new HttpClient(handler);
            var requestResult = new RequestResult();
            var content = new FormUrlEncodedContent(new Dictionary<string, string>
    {
        { "user[login]", account.User },
        { "user[password]", account.Password },
        { "authenticity_token", account.AuthenticityToken },
        { "user[remember_me]", account.RemeberMe },
    });
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/x-www-form-urlencoded");

            try
            {

                var response = await client.PostAsync(account.Endpoint + "users/sign_in", content);
                Log.Information($"登录状态码:{response.StatusCode}");

                if (response.IsSuccessStatusCode)
                {
                    Log.Information("登录成功");

                    // Extract Set-Cookie headers from the response
                    IEnumerable<string> setCookieHeaders;
                    if (response.Headers.TryGetValues("Set-Cookie", out setCookieHeaders))
                    {
                        foreach (var setCookieHeader in setCookieHeaders)
                        {
                            // Parse the Set-Cookie header and add cookies to the cookie container
                            cookieContainer.SetCookies(new Uri(account.Endpoint + "users/sign_in"), setCookieHeader);
                        }
                    }


                    // At this point, cookieContainer should contain the cookies received from the response
                    //var uri = new Uri(account.Endpoint);
                    Log.Information($"cookieContainer.GetCookies(uri).Cast<Cookie>().ToString:{cookieContainer.GetCookies(uri).Cast<Cookie>().ToString()}");

                    StringBuilder sb_cookie = new StringBuilder();
                    List<Cookie> cookies = cookieContainer.GetCookies(uri).Cast<Cookie>().ToList();
                    foreach (var item in cookies)
                    {
                        sb_cookie.Append(item.Name);
                        sb_cookie.Append("=");
                        sb_cookie.Append(item.Value);
                        sb_cookie.Append(";");

                        if (item.Name.Equals("remember_user_token"))
                        {
                            Log.Information($"抓取到 remember_me Token:{item.Value}");
                            requestResult.Message = item.Value;
                            requestResult.Restult = true;
                            return requestResult;
                        }
                    }

                    var result_cookie = sb_cookie.ToString();
                    Log.Information($"result_cookie:{result_cookie}");
                }
                else
                {
                    requestResult.Restult = false;
                    requestResult.Message = "登录 GitLab 页面时请求失败（账户可能有误）";
                    return requestResult;
                }
            }
            catch (Exception ex)
            {
                requestResult.Restult = false;
                requestResult.Message = "登录 GitLab 页面时请求失败" + ex.Message;
                return requestResult;
            }
            finally
            {
                client.Dispose();
            }

            return requestResult;
        }

        public static async Task<RequestResult> GetGitLabCalendarAsync(Models.GitLabAccount account)
        {
            var requestResult = new RequestResult();
            var cookieContainer = new CookieContainer();
            var uri = new Uri(account.Endpoint + "users/sign_in");
            cookieContainer.SetCookies(uri, "remember_user_token=" + account.RemeberMeToken);
            var handler = new HttpClientHandler();
            handler.CookieContainer = cookieContainer;

            var client = new HttpClient(handler);
            try
            {
                var response = await client.GetAsync(account.Endpoint + "users/" + account.User + "/calendar.json");
                Log.Information($"response code:{response.StatusCode}");
                response.EnsureSuccessStatusCode();
                var responseContent = await response.Content.ReadAsStringAsync();
                Log.Information($"Calendar responseContent:{responseContent}");
                Log.Information("开始解析 Calendar Json!");

                if (responseContent.Length > 1)
                {
                    string calender;

                    if (responseContent.StartsWith("{"))
                    {
                        calender = responseContent.Split("{")[1];
                        Log.Information($"Now contributeByDayStr:{calender}");
                        if (responseContent.EndsWith("}"))
                        {
                            calender = calender.Split("}")[0];
                            var contributeByDayStr = calender.Split(",");

                            foreach (var item in contributeByDayStr)
                            {
                                Log.Information($"Now contributeByDayStr item:{item}");
                                string dateStr = item.Split(":")[0];
                                string contributeStr = item.Split(":")[1];
                                Log.Information($"Now dateStr:{dateStr}");
                                Log.Information($"Now contributeStr:{contributeStr}");
                                dateStr = dateStr.Split("\"")[1];
                                Log.Information($"Now dateStr Splited:{dateStr}");
                                var contributeByDayInfo = new Models.GitLabCalendar();
                                DateTime date;
                                bool parseResult = DateTime.TryParse(dateStr, out date);
                                if (parseResult)
                                {
                                    contributeByDayInfo.Date = date;
                                    contributeByDayInfo.Contributes = Convert.ToInt32(contributeStr);
                                    Log.Information($"contributeByDayInfo:{contributeByDayInfo.Date}=>{contributeByDayInfo.Contributes}");
                                    Log.Information("------------------------");

                                    var queryResult = CocoaDataEngine.Db.Queryable<GitLabCalendar>().Where(it => it.Date == contributeByDayInfo.Date).ToList();
                                    Log.Debug($"queryResult Count=>:{queryResult.Count()}");
                                    if (queryResult.Count == 1)
                                    {
                                        Log.Debug($"该日期:{contributeByDayInfo.Date}存在数据，判断是否更新");
                                        if (queryResult[0].Contributes == contributeByDayInfo.Contributes)
                                        {
                                            Log.Information("获取数据与数据库内数据一致,Skip");
                                        }
                                        else
                                        {
                                            Log.Information($"更新数据:{contributeByDayInfo.Date}=>{contributeByDayInfo.Contributes}");
                                            CocoaDataEngine.Db.Updateable(contributeByDayInfo).Where(it => it.Date == contributeByDayInfo.Date).ExecuteCommand();
                                        }
                                    }
                                    else if (queryResult.Count > 1)
                                    {
                                        Log.Warning($"该日期:{contributeByDayInfo.Date}超过一条数据，异常");
                                        throw new Exception($"该日期:{contributeByDayInfo.Date}超过一条数据，异常");
                                    }
                                    else
                                    {
                                        Log.Debug($"该日期:{contributeByDayInfo.Date}不存在数据，直接更新");
                                        try
                                        {
                                            CocoaDataEngine.Db.Insertable(contributeByDayInfo).ExecuteCommand();
                                        }
                                        catch (Exception ex)
                                        {
                                            Log.Error($"插入数据失败:{ex.Message}");
                                        }

                                    }
                                    Log.Information("------------------------");
                                }
                                else
                                {
                                    Log.Warning($"date 解析失败:{dateStr}");
                                }
                            }
                        }
                    }


                }
                else
                {
                    Log.Warning("GitLab Calendar 结果为空");
                    requestResult.Restult = false;
                    requestResult.Message = "请求 GitLab Calendar 结果为空";
                    return requestResult;
                }



            }
            catch (Exception ex)
            {
                requestResult.Restult = false;
                requestResult.Message = "请求 GitLab Calendar 页面时请求失败" + ex.Message;
                return requestResult;
            }
            finally
            {
                client.Dispose();
            }
            return requestResult;
        }

        public class RequestResult
        {
            public bool Restult { get; set; }
            public string? Message { get; set; }
        }
    }
}
