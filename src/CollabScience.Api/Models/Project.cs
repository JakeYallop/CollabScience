using System.Diagnostics;
using System.Text.Json.Serialization;

namespace CollabScience.Api.Models;

[DebuggerDisplay($"{{{nameof(DebuggerDisplay)}(),nq}}")]
public class Project
{
    public int Id { get; init; }
    public string Name { get; init; }
    public string Description { get; init; }
    public Uri Url { get; init; }
    public Uri ImageUrl { get; init; }
    public string[] TimeToHelp { get; init; }
    public string[] Commitment { get; init; }
    public string[] Expertise { get; init; }
    public string[] Area { get; init; }

    private string DebuggerDisplay() => $"{Name} - {string.Join(',', Area)}";
}
