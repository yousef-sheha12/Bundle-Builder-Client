const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/api/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  return response.json();
}
