using Microsoft.AspNetCore.Mvc;
using gitlabCalendar.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace gitlabCalendar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        // GET: api/<CalendarController>
        [HttpGet]
        public string Get()
        {
            var calendarList = CocoaDataEngine.Db.Queryable<GitLabCalendar>().ToList();
            string result = "";
            for (int i = 0; i < calendarList.Count; i++)
            {
                if (i == 0)
                {
                    result += "{";
                }

                result += $"\"{calendarList[i].Date.ToString("yyyy-MM-dd")}\":{calendarList[i].Contributes}";
                if (i < calendarList.Count - 1)
                {
                    result += ",";
                }

                if (i == calendarList.Count - 1)
                {
                    result += "}";
                }
            }
            return result;
        }
    }
}
