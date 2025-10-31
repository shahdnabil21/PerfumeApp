import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import About from "../About/About";
import Shop from "../Shop/Shop";
import Contact from "../Contact/Contact";

import img from "/imgs/home/perfume.png";
import img2 from "/imgs/home/flower.png";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo =
      location?.state?.scrollTo ||
      (window.location.hash ? window.location.hash.replace("#", "") : null);

    if (scrollTo) {
      setTimeout(() => {
        if (scrollTo === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(scrollTo);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        try {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname + window.location.search
          );
        } catch (err) {
          console.log(err);
        }
      }, 80);
    }
  }, [location]);

  return (
    <>
      <section
        id="home"
        className="bg-bg min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-container grid md:grid-cols-2 items-center gap-8">
          <div className="w-full h-160 rounded-lg flex items-center justify-center relative">
            <img
              className="w-full h-[120%] object-contain transform hover:scale-105 transition-transform duration-300 relative z-10 animate__animated animate__slideInDown"
              src={img}
              alt="Premium Perfume"
            />
            <img
              className="w-[70%] absolute -bottom-8 left-1/3 -translate-x-1/2 translate-y-1/4 opacity-80 z-0 animate__animated animate__slideInLeft"
              src={img2}
              alt="Decorative flower"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="text-2xl mb-2 text-gray-500">we just buy</p>
            <h1 className="text-8xl font-header griden leading-tight">
              Premium
            </h1>
            <h1 className="text-8xl font-header griden2 leading-tight">
              Perfume
            </h1>
            <p className="text-gray-500 text-2xl mt-2 mb-6">Velour Essence</p>
            <Link to="/products">
              <button className="btn Btn text-white px-6 py-2 rounded-md hover:Hover cursor-pointer transition-colors duration-300">
                Buy Now <i className="fa-solid fa-cart-plus"></i>
              </button>
            </Link>
          </div>
        </div>
      </section>
      <About />
      <Shop />
      <Contact />
    </>
  );
}
