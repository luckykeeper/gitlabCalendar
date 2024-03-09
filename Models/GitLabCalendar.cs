using SqlSugar;

namespace gitlabCalendar.Models
{
    public class GitLabCalendar
    {
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Contributes { get; set; }
    }

    public class GitLabAccount(string endpoint, string user, string password)
    {
        public string UTF8 { get; set; } = "✓";
        public string? AuthenticityToken { get; set; }
        public string User { get; set; } = user;
        public string Password { get; set; } = password;
        public string RemeberMe { get; set; } = "1";
        public string Endpoint { get; set; } = endpoint;

        public string? Session { get; set; }
        public string? RemeberMeToken { get; set; }
    }
}