using System.Text.Json;
using BundleBuilderApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BundleBuilderApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public ProductsController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpGet]
    public async Task<ActionResult<ProductsResponse>> GetProducts()
    {
        var jsonPath = Path.Combine(_env.ContentRootPath, "Data", "products.json");

        if (!System.IO.File.Exists(jsonPath))
        {
            return NotFound(new { error = "products.json not found" });
        }

        var json = await System.IO.File.ReadAllTextAsync(jsonPath);
        var result = JsonSerializer.Deserialize<ProductsResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return Ok(result);
    }
}
