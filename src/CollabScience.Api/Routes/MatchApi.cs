﻿using CollabScience.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CollabScience.Api.Routes;

public static class MatchApi
{
    public static RouteGroupBuilder MapMatchApiEndpoints(this RouteGroupBuilder group)
    {
        group.MapPost("", (MatchParametersData parameters, MatchingService matchingService) =>
        {
            return matchingService.ComputeMatchAsync(new(
                parameters.AreasOfInterest,
                parameters.Equipment,
                parameters.Expertise,
                parameters.AlreadyViewed
            ));
        });

        group.MapPost("/{count:int}", (int count, MatchParametersData parameters, MatchingService matchingService) =>
        {
            return matchingService.ComputeMatchAsync(new(
                parameters.AreasOfInterest,
                parameters.Equipment,
                parameters.Expertise,
                parameters.AlreadyViewed
            ), count);
        });

        return group;
    }
}

public class MatchParametersData
{
    public string[]? AreasOfInterest { get; init; }
    public string[]? Equipment { get; init; }
    public string[]? Expertise { get; init; }
    public int[]? AlreadyViewed { get; init; }
}

