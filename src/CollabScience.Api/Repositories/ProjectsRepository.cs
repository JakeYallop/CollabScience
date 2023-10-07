using System.Text.Json;

namespace CollabScience.Api.Repositories;

public sealed class ProjectsRepository
{
    private readonly Db _db;

    public ProjectsRepository(Db db)
    {
        _db = db;
    }

    public Task<Project[]> GetProjectsAsync()
    {
        return Task.FromResult(_db.DocumentRoot.RootElement.Deserialize<Project[]>()!);
    }
}
