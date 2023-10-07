using Microsoft.AspNetCore.Mvc;

namespace CollabScience.Api.Routes;

public static class MatchApi
{
    public static RouteGroupBuilder MapMatchApiEndpoints(this RouteGroupBuilder group)
    {
        group.MapPost("", ([FromServices] MatchingService matchingService) =>
        {
            return matchingService.ComputeMatchAsync();
        });

        return group;
    }
}
