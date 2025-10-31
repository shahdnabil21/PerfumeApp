import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart, Checkout } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" }); // { message, type: 'error' | 'success' }

  // --- Handle input change ---
  const handleChange = (e) => {
    // Clear feedback when user starts typing
    if (feedback.message) setFeedback({ message: "", type: "" });
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // --- Confirm payment ---
  const handleConfirm = async () => {
    setFeedback({ message: "", type: "" }); // Reset feedback
    if (!shipping.name || !shipping.address || !shipping.phone) {
      return setFeedback({
        message: "Please fill in all shipping information!",
        type: "error",
      });
    }

    setLoading(true);
    try {
      // Send cart and shipping info to backend checkout
      const res = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, shipping }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Redirect user to Stripe checkout if using Stripe session
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // If using internal payment (like COD), clear cart and update UI
      clearCart();
      setFeedback({
        message: "✅ Payment confirmed! Redirecting...",
        type: "success",
      });
      setTimeout(() => navigate("/products"), 2000); // go back to products page after a short delay
    } catch (err) {
      setFeedback({
        message: err.message || "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return (
      <section className="py-20 text-center">
        <h2 className="text-6xl font-header mb-6">Checkout</h2>
        <p>Your cart is empty.</p>
      </section>
    );

  return (
    <section className="py-16 max-w-3xl mx-auto">
      <h2 className="text-5xl font-header mb-8 griden text-center">Checkout</h2>

      {/* Shipping Info */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shipping.name}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shipping.address}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shipping.phone}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Your Order</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>EGP {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>
            EGP{" "}
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>
      </div>

      {/* Feedback Message */}
      {feedback.message && (
        <div
          className={`text-center p-3 rounded-lg mb-6 ${
            feedback.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Confirm Button */}
      <div className="text-center">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="Btn px-8 py-3 rounded-lg text-white hover:bg-hover transition-colors"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </div>
    </section>
  );
}
