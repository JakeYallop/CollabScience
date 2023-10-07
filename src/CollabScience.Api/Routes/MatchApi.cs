using CollabScience.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CollabScience.Api.Routes;

public static class MatchApi
{
    public static RouteGroupBuilder MapMatchApiEndpoints(this RouteGroupBuilder group)
    {
        group.MapPost("", (MatchParameters parameters, MatchingService matchingService) =>
        {
            return matchingService.ComputeMatchAsync(parameters);
        });

        return group;
    }
}
