import React from "react";
import { FaCheckCircle, FaBolt, FaUsers, FaChartLine, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const benefits = [
  {
    icon: <FaBolt className="text-blue-600 w-6 h-6" />,
    title: "Instant setup",
    text: "Add menu, tables and QR codes — start taking orders in minutes.",
  },
  {
    icon: <FaUsers className="text-green-600 w-6 h-6" />,
    title: "Better guest experience",
    text: "Customers browse, order and pay from their phone — faster turns, happier guests.",
  },
  {
    icon: <FaChartLine className="text-indigo-600 w-6 h-6" />,
    title: "Smart insights",
    text: "Simple dashboards show top dishes, peak hours and daily revenue.",
  },
  {
    icon: <FaMobileAlt className="text-yellow-500 w-6 h-6" />,
    title: "Contactless & secure",
    text: "Digital menus + Razorpay payments make dining safe and fast.",
  },
];

const WhyUseSimple = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#EFF6FF] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-10">
        {/* Left: Headline + list */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Restaurants Choose QraMg
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl">
            A no-nonsense platform built for restaurants — increase order speed,
            reduce errors, and get real data without extra hardware or complex setup.
          </p>

          {/* Vertical benefit list — simple rows, no cards */}
          <div className="space-y-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1">{b.icon}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{b.title}</h3>
                    {i === 0 && (
                      <span className="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{b.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          {/* <div className="mt-8">
            <button
              onClick={() => navigate("/auth/signup")}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition"
            >
              Start Free Trial
              <FaCheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/demo")}
              className="ml-4 px-4 py-3 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              Watch Demo
            </button>
          </div> */}
        </div>

        {/* Right: Illustration (simple image) */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src="/whychoose.webp"
            alt="Why use QraMg illustration"
            className="w-full max-w-md rounded-lg shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUseSimple;
