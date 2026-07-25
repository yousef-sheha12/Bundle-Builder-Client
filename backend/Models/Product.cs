namespace BundleBuilderApi.Models;

public class Product
{
    public string Id { get; set; } = string.Empty;
    public string Step { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? LearnMore { get; set; }
    public string Image { get; set; } = string.Empty;
    public string? Badge { get; set; }
    public decimal? CompareAtPrice { get; set; }
    public decimal Price { get; set; }
    public bool HasVariants { get; set; }
    public List<Variant> Variants { get; set; } = new();
    public string? DefaultVariant { get; set; }
    public string? PriceUnit { get; set; }
    public string? CompareAtPriceUnit { get; set; }
    public bool IsFree { get; set; }
}
