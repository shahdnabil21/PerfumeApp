// src/App.js - Update your router

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";

import Layout from "./components/Layout/Layout.jsx";

import Checkout from "./components/Checkout/Checkout.jsx";
import Products from "./Components/Products/Products.jsx";
import { CartProvider } from "./components/Context/CartContext.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
