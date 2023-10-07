using CollabScience.Api;
using CollabScience.Api.Repositories;
using CollabScience.Api.Routes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(c => new Db("data.json"));
builder.Services.AddScoped<ProjectsRepository>();
builder.Services.AddScoped<MatchingService, ParametersMatchingService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGroup("/api/match")
    .MapMatchApiEndpoints()
    .WithTags("Match");

app.MapGet("/api", () => "Hello World!");

app.Run();
