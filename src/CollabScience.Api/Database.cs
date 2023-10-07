using System.Text.Json;

namespace CollabScience.Api;

public class Db
{
    private readonly string _jsonFilePath;

    public Db(string jsonFilePath)
    {
        _jsonFilePath = jsonFilePath;
        DocumentRoot = JsonDocument.Parse(File.ReadAllText(_jsonFilePath));
    }

    public JsonDocument DocumentRoot { get; }
}
