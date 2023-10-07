namespace CollabScience.Api.Routes;

public static class MatchApi
{
    public static RouteGroupBuilder MapMatchApiEndpoints(this RouteGroupBuilder group)
    {
        group.MapPost("", () =>
        {
            return Results.Ok("Hello world!");
        });
        return group;
    }
}
