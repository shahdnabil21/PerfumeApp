import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import { API_URL } from "../../lib/constants";

export default function Products() {
  const { addToCart } = useCart();
  const [perfumeList, setPerfumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/all-products`);
        const products = res.data.data || res.data; // handles both response formats
        setPerfumeList(products.filter((p) => p.stock > 0));
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <h2 className="text-center mt-12">Loading products...</h2>;

  return (
    <section className="py-16 text-center">
      <h2 className="text-6xl griden font-header mb-12">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {perfumeList.map((p) => (
          <div
            key={p.id}
            className="bg-white/95 shadow-lg rounded-xl overflow-hidden transition-transform hover:-translate-y-1 duration-300 flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/2 h-64 flex items-center justify-center overflow-hidden">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-btn/30">
                  <i className="fa-solid fa-spray-can-sparkles"></i>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-header mb-2">{p.name}</h3>
                <p className="text-sm mb-4">{p.description}</p>
                <p className="text-xs italic">
                  {Array.isArray(p.notes) ? p.notes.join(", ") : p.notes}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-xl font-semibold">EGP {p.price}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="Btn px-4 py-2 rounded-lg text-white hover:bg-hover"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
