import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#EFF6FF] pt-24 pb-20 overflow-hidden">
      {/* 🌌 Soft Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-300/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 z-10">
        
        {/* 🩵 Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-2">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              Trusted by 1K+ Restaurants
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Digitize Your Restaurant <br />
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text relative">
              With Smart QR Menus
              <div className="absolute bottom-1 left-0 w-full h-2 bg-blue-100/60 -z-10 rounded-lg" />
            </span>{" "}
            🍽️
          </h1>

          <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed font-light">
            Customers scan, browse, order, and pay effortlessly — giving you
            a fully digital dining experience.  
            <span className="block mt-2 font-medium text-gray-700">
              Simplify management with one dashboard.
            </span>
          </p>

          {/* 🎯 CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6">
            <button
              onClick={() => navigate("/signup")}
              className="group relative px-8 py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="relative flex items-center justify-center gap-2">
                Get Started Free
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            <button
              onClick={() => navigate("/demo")}
              className="group px-6 py-4 rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </span>
            </button>
          </div>

          {/* ⭐ Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <span>Join 1,000+ restaurants</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>4.9/5 (500+ reviews)</span>
            </div>
          </div>
        </div>

        {/* 🖼️ Right Image with Parallax Floating */}
        <div className="md:w-1/2 flex justify-center items-center relative">
          <div className="absolute -z-10 w-[260px] sm:w-[380px] md:w-[480px] h-[260px] sm:h-[380px] md:h-[480px] bg-cyan-300/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <img
            src="/hero-restaurant-qr.webp"
            alt="QR Menu Demo"
            loading="lazy"
            className="w-[90%] max-w-[420px] md:max-w-[520px] lg:max-w-[620px] h-auto object-contain rounded-3xl hover:scale-105 transition-transform duration-700 animate-smoothFloat"
          />
        </div>
      </div>

      {/* 📊 Stats Section */}
      <div className="mt-20 flex flex-wrap justify-center gap-6 text-center px-4">
        {[
          { number: "1K+", text: "Restaurants Using QraMg", color: "text-blue-600" },
          { number: "50K+", text: "Daily Orders Processed", color: "text-cyan-500" },
          { number: "24/7", text: "Support & Monitoring", color: "text-blue-600" },
        ].map((stat, index) => (
          <div
            key={index}
            className="w-[180px] p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.number}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.text}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;
