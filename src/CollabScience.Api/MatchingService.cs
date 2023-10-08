﻿using System.Numerics;
using CollabScience.Api.Models;
using CollabScience.Api.Repositories;

namespace CollabScience.Api;

public abstract class MatchingService
{
    public abstract Task<IEnumerable<Project>> ComputeMatchAsync(MatchParameters parameters, int numberOfMatches = 1);
}


public sealed class ParametersMatchingService : MatchingService
{
    private readonly ProjectsRepository _projectsRepository;
    private const double AreasOfInterestWeight = 2;
    private const double ExpertiseWeight = 1;

    public ParametersMatchingService(ProjectsRepository projectsRepository)
    {
        _projectsRepository = projectsRepository;
    }

    public override async Task<IEnumerable<Project>> ComputeMatchAsync(MatchParameters parameters, int numberOfMatches = 1)
    {
        var projects = await _projectsRepository.GetProjectsAsync().ConfigureAwait(false);
        if (parameters.IsEmptyProfile)
        {
            return RandomSampleMatcher.Match(projects, numberOfMatches);
        }

        if (parameters.AlreadyViewed.Count == projects.Length)
        {
            return Array.Empty<Project>();
        }

        return projects.OrderByDescending(x => ComputeWeightForProject(x, parameters)).Take(numberOfMatches);
    }

    private static double ComputeWeightForProject(Project project, MatchParameters parameters)
    {
        var areasOfInterest = MatchingUtilities.ProportionMatchingInSelections(project.Area.ToHashSet(), parameters.AreasOfInterest) * AreasOfInterestWeight;
        var expertise = MatchingUtilities.ProportionMatchingInSelections(project.Expertise.ToHashSet(), parameters.Expertise) * ExpertiseWeight;
        var result = areasOfInterest + expertise;

        if (parameters.AlreadyViewed.Contains(project.Id) || parameters.PendingMatches.Contains(project.Id))
        {
            result = double.MinValue;
        }
        return result;
    }
}

public static class MatchingUtilities
{
    public static double ProportionMatchingInSelections<T>(ISet<T> pool, ICollection<T> selections) where T : notnull, IEquatable<T>
    {
        if (pool.Count == 0)
        {
            return 1;
        }

        var matches = 0;
        foreach (var selection in selections)
        {
            if (pool.Contains(selection))
            {
                matches++;
            }
        }

        if (matches == 0)
        {
            return 0;
        }

        return matches / selections.Count;
    }
}

public static class RandomSampleMatcher
{
    public static IEnumerable<Project> Match(Project[] projects, int count = 1)
    {
        return projects.OrderBy(x => Random.Shared.Next(0, projects.Length)).Take(count);
    }
}
