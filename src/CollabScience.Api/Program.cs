using CollabScience.Api;
using CollabScience.Api.Repositories;
using CollabScience.Api.Routes;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo()
        {
            Title = "API",
        });
    });
}

builder.Services.AddSingleton(c => new Db("data.json"));
builder.Services.AddScoped<ProjectsRepository>();
builder.Services.AddScoped<MatchingService, RandomSampleMatchingService>();

var app = builder.Build();

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.DocumentTitle = "API";
        options.ConfigObject.DocExpansion = Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None;
        options.RoutePrefix = "";
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API");
    });
}

app.UseStaticFiles();

app.MapGroup("/api/match")
    .MapMatchApiEndpoints()
    .WithTags("Match");

app.MapGet("/api", () => "Hello World!");

app.MapFallbackToFile("index.html");

app.Run();
