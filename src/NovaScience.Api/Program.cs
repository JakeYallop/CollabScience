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

app.MapGet("api/", () => "Hello World!");

app.MapFallbackToFile("index.html");

app.Run();
