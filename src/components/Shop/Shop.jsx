import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import { API_URL } from "../../lib/constants";

export default function Shop() {
  const { addToCart } = useCart();
  const [perfumeList, setPerfumeList] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/all-products`);
      const products = res.data.data || res.data; 

      const inStock = products.filter((p) => p.stock > 0);

      setPerfumeList(inStock.slice(0, 4));
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  

  if (loading)
    return (
      <section className="py-16 text-center">
        <h2 className="text-6xl font-header mb-12">Loading products...</h2>
      </section>
    );

  return (
    <section className="py-16 text-center" id="shop">
      <h2 className="text-8xl griden2 font-header mb-8">Shop Now</h2>

      <div className="mt-8 flex justify-end max-w-6xl mx-auto">
        <Link
          to="/products"
          className="Btn px-5 py-2 text-white rounded-lg hover:bg-hover transition-colors"
        >
          See More
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8">
        {perfumeList.map((perfume) => (
          <div
            key={perfume.id}
            className="bg-white/95 shadow-lg rounded-xl overflow-hidden transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-64">
                {perfume.image ? (
                  <img
                    src={perfume.image}
                    alt={perfume.name}
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
                  <h3 className="text-2xl font-header mb-2">{perfume.name}</h3>
                  <p className="text-sm mb-4">{perfume.description}</p>
                  <p className="text-xs italic">
                    {Array.isArray(perfume.notes) ? perfume.notes.join(", ") : perfume.notes || ""}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-xl font-semibold">EGP {perfume.price}</p>
                  <button
                    onClick={() => addToCart(perfume)}
                    className="Btn px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-hover transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
