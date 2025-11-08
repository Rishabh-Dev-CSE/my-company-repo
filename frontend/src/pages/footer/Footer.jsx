import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#F9FAFB] via-white to-[#EFF6FF] text-gray-700 py-14 px-6">
      {/* Accent line on top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
        
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="QraMg" className="w-9 h-9" />
            <h2 className="text-gray-900 font-bold text-2xl tracking-wide">
              QraMg
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
            A smart digital platform helping restaurants digitize menus, manage
            orders, and accept payments — seamlessly.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4 text-lg">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/about"
                className="hover:text-cyan-500 transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-cyan-500 transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="hover:text-cyan-500 transition duration-300"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-cyan-500 transition duration-300"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4 text-lg">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/faq"
                className="hover:text-cyan-500 transition duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-cyan-500 transition duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-cyan-500 transition duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="hover:text-cyan-500 transition duration-300"
              >
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4 text-lg">
            Follow Us
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <a
              href="#"
              className="p-2 bg-white rounded-full border border-gray-200 hover:bg-cyan-500 hover:text-white transition duration-300 transform hover:-translate-y-1 shadow-sm"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-white rounded-full border border-gray-200 hover:bg-pink-500 hover:text-white transition duration-300 transform hover:-translate-y-1 shadow-sm"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-white rounded-full border border-gray-200 hover:bg-sky-400 hover:text-white transition duration-300 transform hover:-translate-y-1 shadow-sm"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-white rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition duration-300 transform hover:-translate-y-1 shadow-sm"
            >
              <FaLinkedinIn />
            </a>
          </div>
          <p className="text-sm text-gray-600">
            📍 New Delhi, India <br />
            📧 support@qramg.com
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-cyan-500 font-semibold">QraMg</span>. All rights
        reserved.
      </div>

      {/* Subtle Glow Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-gradient-to-t from-cyan-300/20 via-blue-300/10 to-transparent blur-3xl opacity-60"></div>
    </footer>
  );
};

export default Footer;
