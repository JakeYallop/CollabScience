using CollabScience.Api.Repositories;

namespace CollabScience.Api;

public abstract class MatchingService
{
    public abstract Task<Project> ComputeMatchAsync();
}


public class Project
{
    public Project(string projectName, string description, Uri link)
    {
        ProjectName = projectName;
        Description = description;
        Link = link;
    }

    public string ProjectName { get; }
    public string Description { get; }
    public Uri Link { get; }
    public Uri? ImageUrl { get; }
    public string[]? TimeToHelp { get; }
    public string? Commitment { get; }
    public string[]? Expertise { get; }
    public string[]? AreasOfResearch { get; }
}

public sealed class RandomSampleMatchingService : MatchingService
{
    private readonly ProjectsRepository _projectsRepository;

    public RandomSampleMatchingService(ProjectsRepository projectsRepository)
    {
        _projectsRepository = projectsRepository;
    }

    public override async Task<Project> ComputeMatchAsync()
    {
        var projects = await _projectsRepository.GetProjectsAsync().ConfigureAwait(false);

        return projects[Random.Shared.Next(0, projects.Length)];

    }
}
