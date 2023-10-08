namespace CollabScience.Api.Models;

public class MatchParameters
{
    public MatchParameters(IEnumerable<string>? areasOfInterest, IEnumerable<string>? equipment, IEnumerable<string>? expertise, IEnumerable<int>? pendingMatches, IEnumerable<int>? alreadyViewed, IEnumerable<int>? alreadyMatched)
    {
        AreasOfInterest = (areasOfInterest ?? Array.Empty<string>()).Where(x => !string.IsNullOrWhiteSpace(x)).ToHashSet(StringComparer.OrdinalIgnoreCase);
        Equipment = (equipment ?? Array.Empty<string>()).Where(x => !string.IsNullOrWhiteSpace(x)).ToHashSet(StringComparer.OrdinalIgnoreCase);
        Expertise = (expertise ?? Array.Empty<string>()).Where(x => !string.IsNullOrWhiteSpace(x)).ToHashSet(StringComparer.OrdinalIgnoreCase);
        AlreadyViewed = (alreadyViewed ?? Array.Empty<int>()).ToHashSet();
        PendingMatches = (pendingMatches ?? Array.Empty<int>()).ToHashSet();
        AlreadyMatched = (alreadyMatched ?? Array.Empty<int>()).ToHashSet();

        IsEmptyProfile = areasOfInterest is null || equipment is null || expertise is null;
    }

    public bool IsEmptyProfile { get; }
    public HashSet<string> AreasOfInterest { get; }
    public HashSet<string> Equipment { get; }
    public HashSet<string> Expertise { get; }
    public HashSet<int> PendingMatches { get; }
    public HashSet<int> AlreadyViewed { get; }
    public HashSet<int> AlreadyMatched { get; }
}
