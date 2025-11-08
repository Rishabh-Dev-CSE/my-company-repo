import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#EFF6FF] pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Digitize Your Restaurant <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
              With Smart QR Menus
            </span>{" "}
            🍽️
          </h1>

          {/* Hide this paragraph on mobile */}
          <p className="hidden sm:block text-base sm:text-lg text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed">
            Let your customers scan a QR code, explore your digital menu,
            place orders, and make payments — all in one seamless experience.  
            Manage everything from one smart dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="hidden sm:block flex  flex-col sm:flex-row gap-4 ms-[20px] justify-center md:justify-start pt-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-blue-600 to-cyan-400 hover:scale-105 hover:shadow-lg transition-all duration-300 me-[20px]"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/demo")}
              className="px-6 py-3 rounded-xl text-gray-800 font-semibold text-lg border border-gray-300 hover:bg-gray-100 hover:shadow-md transition-all duration-300"
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="absolute -z-10 w-[300px] h-[300px] bg-cyan-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse" />
          <img
            src="/hero-restaurant-qr.png"
            alt="QR Menu Demo"
            className="w-[80%] md:w-[90%] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 flex flex-wrap justify-center gap-10 text-center">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-blue-600">1K+</h3>
          <p className="text-gray-500 text-sm md:text-base">Restaurants Using QraMg</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-cyan-500">50K+</h3>
          <p className="text-gray-500 text-sm md:text-base">Daily Orders Processed</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
          <p className="text-gray-500 text-sm md:text-base">Support & Monitoring</p>
        </div>
      </div>

      {/* Floating Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200 via-cyan-200 to-transparent blur-3xl opacity-40 -z-20" />
    </section>
  );
};

export default HeroSection;
