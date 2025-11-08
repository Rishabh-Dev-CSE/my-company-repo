import React from "react";
import { FaQrcode, FaUtensils, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaQrcode className="text-blue-600 text-4xl mb-3" />,
    title: "Step 1: Scan the QR Code",
    desc: "Every table has its own QR code. The customer scans it to open that table’s digital menu instantly.",
  },
  {
    icon: <FaUtensils className="text-green-600 text-4xl mb-3" />,
    title: "Step 2: Explore the Menu",
    desc: "The customer browses your menu — with images, prices, and categories — directly on their phone.",
  },
  {
    icon: <FaMoneyBillWave className="text-yellow-500 text-4xl mb-3" />,
    title: "Step 3: Place Order & Pay Online",
    desc: "They select dishes, confirm the order, and make payment easily using Razorpay — no waiter needed.",
  },
  {
    icon: <FaCheckCircle className="text-indigo-600 text-4xl mb-3" />,
    title: "Step 4: Kitchen Receives the Order",
    desc: "Your staff sees the live order instantly on the kitchen dashboard and starts preparing it right away.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="w-full bg-gray-50 py-20 px-6 bg-gradient-to-b from-[#F9FAFB] via-white to-[#EFF6FF]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          QraMg makes restaurant ordering simple — for both customers and staff.  
          Here’s how your entire dining experience becomes contactless & efficient.
        </p>

        {/* Steps List */}
        <div className="flex flex-col space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                {step.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Small ending line */}
        <p className="text-gray-500 text-sm mt-12">
          Setup once — and your restaurant runs smart forever.
        </p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
