using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Serilog;
using SqlSugar;

namespace gitlabCalendar.Models
{
    public class CocoaDataEngine
    {
        public static SqlSugarScope Db = new SqlSugarScope(new ConnectionConfig()
        {
            ConnectionString = "datasource=GitLabCalendar.db",
            DbType = DbType.Sqlite,
            IsAutoCloseConnection = true
        },
  db =>
  {
      db.Aop.OnLogExecuting = (sql, pars) =>
      {
          Log.Information(UtilMethods.GetNativeSql(sql, pars));
      };
  });
    }
}
