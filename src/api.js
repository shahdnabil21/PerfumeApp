// central api helper
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";


export async function fetchProducts() {
const res = await fetch(`${BASE}/api/products`);
if (!res.ok) throw new Error("Failed to fetch products");
return res.json();
}


export async function postCheckout(payload) {
const res = await fetch(`${BASE}/api/checkout`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload),
});
const data = await res.json();
if (!res.ok) {
const err = new Error(data.message || "Checkout failed");
err.details = data;
throw err;
}
return data;
}