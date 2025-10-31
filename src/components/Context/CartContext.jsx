/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../../lib/constants";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("aromatic_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("aromatic_cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to Cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert("Cannot add more, out of stock!");
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  const increaseQuantity = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? item.quantity + 1 > item.stock
            ? (alert("Out of stock!"), item)
            : { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  const decreaseQuantity = (id) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Checkout function
  const checkout = async (shipping) => {
    if (cart.length === 0) return alert("Cart is empty");

    if (!shipping?.name || !shipping?.address || !shipping?.phone) {
      return alert("Please provide name, address, and phone");
    }

    try {
      const res = await axios.post(`${API_URL}/api/checkout`, {
        cart,
        shipping,
      });

      const data = res.data;

      // Handle out-of-stock items
      if (data.outOfStockItems?.length > 0) {
        alert(
          `These items are out of stock: ${data.outOfStockItems
            .map((i) => i.name)
            .join(", ")}`
        );

        setCart((prev) =>
          prev.filter(
            (item) => !data.outOfStockItems.find((o) => o.id === item.id)
          )
        );
        return;
      }

      // ✅ Success
      alert("✅ Checkout successful!");
      clearCart();
      return data.updatedProducts || [];
    } catch (err) {
      console.error("❌ Checkout error:", err);
      alert("Checkout failed. Please try again later.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal,
        cartCount,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};
