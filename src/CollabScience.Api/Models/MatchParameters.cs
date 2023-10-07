namespace CollabScience.Api.Models;

public class MatchParameters
{
    public MatchParameters(IEnumerable<string> areasOfInterest, IEnumerable<string> equipment, IEnumerable<string> expertise, IEnumerable<int> alreadyMatched)
    {
        AreasOfInterest = areasOfInterest.ToHashSet();
        Equipment = equipment.ToHashSet();
        Expertise = expertise.ToHashSet();
        AlreadyMatched = alreadyMatched.ToHashSet();
    }

    public HashSet<string> AreasOfInterest { get; }
    public HashSet<string> Equipment { get; }
    public HashSet<string> Expertise { get; }
    public HashSet<int> AlreadyMatched { get; }
}
