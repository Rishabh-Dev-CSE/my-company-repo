import React from "react";
import { FaQrcode, FaMoneyBillWave, FaChartLine, FaUtensils } from "react-icons/fa";

const features = [
  {
    title: "Smart QR Menu",
    icon: <FaQrcode className="text-[#2563EB] text-4xl" />,
    desc: "Create digital menus instantly. Customers can scan QR codes at tables and view your live menu — no reprinting ever needed!",
  },
  {
    title: "Real-Time Orders",
    icon: <FaUtensils className="text-[#16A34A] text-4xl" />,
    desc: "Receive and manage orders instantly through your dashboard. Update status live and keep your kitchen synced.",
  },
  {
    title: "Integrated Payments",
    icon: <FaMoneyBillWave className="text-[#F59E0B] text-4xl" />,
    desc: "Accept secure online payments via Razorpay and track transactions for each table, order, or day.",
  },
  {
    title: "Analytics & Insights",
    icon: <FaChartLine className="text-[#2563EB] text-4xl" />,
    desc: "Get real-time insights on sales, best-selling dishes, and customer patterns — all from your analytics panel.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#EFF6FF] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
          Everything Your Restaurant Needs — In One Platform
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          QraMg helps restaurants run smarter — from table-side ordering to payments and insights,  
          all in one simple and intuitive platform.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 bg-[#EFF6FF] rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#111827]">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
