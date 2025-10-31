// src/App.js - Update your router
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";

import Layout from "./components/Layout/Layout";

import Checkout from "./components/Checkout/Checkout";
import Products from "./Components/Products/Products";
import { CartProvider } from "./Components/Context/CartContext";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout/> },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}