using CollabScience.Api.Models;
using CollabScience.Api.Repositories;

namespace CollabScience.Api;

public abstract class MatchingService
{
    public abstract Task<Project> ComputeMatchAsync(MatchParameters? parameters);
}

public class MatchParameters
{

}

public sealed class RandomSampleMatchingService : MatchingService
{
    private readonly ProjectsRepository _projectsRepository;

    public RandomSampleMatchingService(ProjectsRepository projectsRepository)
    {
        _projectsRepository = projectsRepository;
    }

    public override async Task<Project> ComputeMatchAsync(MatchParameters? parameters)
    {
        var projects = await _projectsRepository.GetProjectsAsync().ConfigureAwait(false);

        return projects[Random.Shared.Next(0, projects.Length)];
    }
}
