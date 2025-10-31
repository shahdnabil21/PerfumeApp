
import { useCart } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartTotal } = useCart();
const navigate = useNavigate();
  if (cart.length === 0) return (
    <section className="py-20 text-center">
      <h2 className="text-6xl font-header mb-6">Your Cart</h2>
      <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
      <Link to="/Products" className="Btn px-6 py-3 text-white rounded-lg hover:bg-hover transition-colors">
        Go to Shop
      </Link>
    </section>
  );

  return (
    <section className="py-20 text-center">
      <h2 className="text-6xl font-header griden2 mb-8">Your Cart</h2>

      <div className="max-w-5xl mx-auto bg-white/90 shadow-lg rounded-xl p-6">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b border-btn/10 py-4">
            <div className="flex items-center gap-4">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md"/>
              ) : (
                <div className="w-24 h-24 flex items-center justify-center text-3xl text-btn/40 bg-white/70 rounded-md">
                  <i className="fa-solid fa-spray-can-sparkles"></i>
                </div>
              )}
              <div className="text-left">
                <h3 className="text-2xl font-header">{item.name}</h3>
                <p className="text-gray-500">EGP {item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center border border-btn/20 rounded-lg overflow-hidden shadow-sm">
                <button onClick={() => decreaseQuantity(item.id)} className="px-4 py-2 bg-[#cc7f7f] text-white text-lg hover:bg-[#a85c5c]">–</button>
                <span className="w-10 text-center font-medium text-lg text-[#3e2524] bg-white">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="px-4 py-2 bg-[#cc7f7f] text-white text-lg hover:bg-[#a85c5c]">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-xl">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <h3 className="text-2xl font-semibold">Total: <span className="text-btn">EGP {cartTotal.toFixed(2)}</span></h3>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button onClick={clearCart} className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Clear Cart</button>
              <button
    onClick={() => navigate("/checkout")} // <-- go to checkout page
    className="Btn px-6 py-2 text-white rounded-lg hover:bg-hover"
  >
    Checkout
  </button>
          </div>
        </div>
      </div>
    </section>
  );
}
