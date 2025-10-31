
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";


export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 transition-colors duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-5xl font-header text-[#3e2524]">
            Aroma<span className="text-[#cc7f7f]">Tic</span>
          </span>
        </Link>

        <div className="flex md:order-2 space-x-4">
          <ul>
            <li className="flex items-center space-x-4 md:mt-0 mt-2">
              <Link to="">
                <i className="text-2xl fa-regular fa-heart text-[#3e2524] hover:text-[#cc7f7f] transition-colors"></i>
              </Link>
         <Link to="/cart" className="relative">
  <i className="text-2xl fa-solid fa-cart-plus text-[#3e2524] hover:text-[#cc7f7f] transition-colors"></i>

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-[#cc7f7f] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</Link>
            </li>
          </ul>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#3e2524] rounded-lg md:hidden hover:bg-[#f5cdcd] focus:outline-none focus:ring-2 focus:ring-[#cc7f7f]"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 text-xl md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
              <button
                type="button"
                className="block py-2 px-3 text-[#3e2524] rounded-sm hover:text-[#cc7f7f] transition-colors"
                onClick={() => {
                  if (location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    navigate("/", { state: { scrollTo: "top" } });
                  }
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className="block py-2 px-3 text-[#3e2524] rounded-sm hover:text-[#cc7f7f] transition-colors"
                onClick={() => {
                  if (location.pathname === "/") {
                    const el = document.getElementById("about");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/", { state: { scrollTo: "about" } });
                  }
                }}
              >
                About
              </button>
            </li>

            <li>
              <Link
                to="/products"
                className="block py-2 px-3 text-[#3e2524] rounded-sm hover:text-[#cc7f7f] transition-colors"
              >
                Products
              </Link>
            </li>

            <li>
              <button
                type="button"
                className="block py-2 px-3 text-[#3e2524] rounded-sm hover:text-[#cc7f7f] transition-colors"
                onClick={() => {
                  if (location.pathname === "/") {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/", { state: { scrollTo: "contact" } });
                  }
                }}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
