using CollabScience.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CollabScience.Api.Routes;


public static class ProjectsApi
{
    public static RouteGroupBuilder MapProjectsApiEndpoints(this RouteGroupBuilder group)
    {

        group.MapGet("", async ([FromQuery] int[] projectIds, ProjectsRepository projectsRepository) =>
        {
            var projects = await projectsRepository.GetProjectsAsync();
            return projects.Where(x => projectIds.Contains(x.Id));
        });

        return group;
    }
}
