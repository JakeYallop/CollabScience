using System.Text.Json.Serialization;

namespace CollabScience.Api.Models;

public class Project
{
    [JsonConstructor]
    public Project(int id, string name, string description, Uri url)
    {
        Id = id;
        ProjectName = name;
        Description = description;
        Link = url;
    }

    public int Id { get; }
    public string ProjectName { get; }
    public string Description { get; }
    public Uri Link { get; }
    public Uri ImageUrl { get; }
    public string[] TimeToHelp { get; }
    public string Commitment { get; }
    public string[] Expertise { get; }
    public string[] AreasOfResearch { get; }
}
