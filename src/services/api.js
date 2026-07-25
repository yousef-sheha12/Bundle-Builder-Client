const API_BASE = "/api";

export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  return response.json();
}
