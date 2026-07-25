namespace BundleBuilderApi.Models;

public class ProductsResponse
{
    public List<Step> Steps { get; set; } = new();
    public List<Product> Products { get; set; } = new();
    public Shipping Shipping { get; set; } = new();
}
