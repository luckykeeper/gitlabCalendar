using gitlabCalendar.Models;
using gitlabCalendar.CronCenter;
using Coravel;
using Serilog;
using Microsoft.AspNetCore.Builder;

CocoaDataEngine.Db.DbMaintenance.CreateDatabase();
CocoaDataEngine.Db.CodeFirst.InitTables<GitLabCalendar>();

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console(outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u4}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

CocoaDataEngine.Db.DbMaintenance.CreateDatabase();
CocoaDataEngine.Db.CodeFirst.InitTables<GitLabCalendar>();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Host.UseSerilog();

Log.Information("Init Cron Task...");

builder.Services.AddScheduler();
builder.Services.AddTransient<CronSyncCalendar>();

Log.Information("Cron Task Init Completed!");

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
DefaultFilesOptions defaultFilesOptions = new DefaultFilesOptions();
defaultFilesOptions.DefaultFileNames.Clear();
defaultFilesOptions.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(defaultFilesOptions);
app.UseStaticFiles();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Services.UseScheduler(scheduler =>
{
    scheduler
        .Schedule<CronSyncCalendar>()
        .EveryThirtyMinutes();
});

app.UseAuthorization();

app.MapControllers();

app.Run();

