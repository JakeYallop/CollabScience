using CollabScience.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CollabScience.Api.Routes;


public static class ProjectsApi
{
    public static RouteGroupBuilder MapProjectsApiEndpoints(this RouteGroupBuilder group)
    {

        group.MapGet("/", async ([FromQuery] ProjectIds projectIds, ProjectsRepository projectsRepository) =>
        {
            var projects = await projectsRepository.GetProjectsAsync();
            return projects.Where(x => projectIds.Ids.Contains(x.Id));
        });

        return group;
    }
}



public class ProjectIds
{
    public int[] Ids { get; } = Array.Empty<int>();
}


