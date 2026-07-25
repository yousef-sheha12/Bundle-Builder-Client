namespace BundleBuilderApi.Models;

public class Step
{
    public string Id { get; set; } = string.Empty;
    public int StepNumber { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? NextLabel { get; set; }
}
