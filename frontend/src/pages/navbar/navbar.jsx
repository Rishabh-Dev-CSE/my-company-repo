import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiGet } from "../../utils/api";

const navItems = {
  admin: [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Restaurants", path: "/admin/restaurants" },
    { name: "Subscriptions", path: "/admin/subscriptions" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Active Restaurants", path: "/admin/active-restaurents" },
    { name: "All Users", path: "/admin/all-user" },
    { name: "Daily Connection", path: "/admin/daily-connection" },
  ],
  owner: [
    { name: "Dashboard", path: "/restaurant/dashboard" },
    { name: "Menu", path: "/restaurant/menu" },
    { name: "Tables & QR", path: "/restaurant/tables" },
    { name: "Orders", path: "/restaurant/orders" },
    { name: "Reports", path: "/restaurant/reports" },
    { name: "Settings", path: "/restaurant/settings" },
    { name: "Terms & Conditions", path: "/restaurant/terms-conditions" },
  ],
  staff: [
    { name: "Kitchen Dashboard", path: "/staff/kitchen" },
    { name: "Order History", path: "/staff/orders" },
  ],
  tour_user: [
    { name: "Home", path: "/" },
    { name: "About", path: "/tour_about" },
    { name: "Support", path: "/support" },
  ],
};

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;
    apiGet("/api/user/")
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/logout/", { method: "POST" });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLogin = () => navigate("/auth/login");
  const role = user?.role?.toLowerCase() || "tour_user";
  const navLinks = navItems[role] || [];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-gradient-to-r from-[#F9FAFB]/90 via-white/90 to-[#EFF6FF]/90 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-2xl font-extrabold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="Logo" className="w-9 h-9" />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            QraMg
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              <Link
                to={link.path}
                className="hover:text-cyan-500 transition-colors duration-200"
              >
                {link.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:block">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Logout ({user.username})
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Signup / Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none relative"
        >
          <span
            className={`block h-0.5 bg-gray-800 transform transition-all duration-300 ${
              isMobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 bg-gray-800 transition-all duration-300 ${
              isMobileOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 bg-gray-800 transform transition-all duration-300 ${
              isMobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu with staggered reveal animation */}
      <div
        className={`md:hidden backdrop-blur-xl bg-gradient-to-r from-[#F9FAFB]/95 via-white/95 to-[#EFF6FF]/95 border-t border-gray-200 transform transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] origin-top ${
          isMobileOpen
            ? "max-h-96 opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={`hover:text-cyan-500 transition-all duration-300 transform ${
                isMobileOpen
                  ? `opacity-100 translate-y-0 delay-[${index * 80}ms]`
                  : "opacity-0 -translate-y-2"
              }`}
              style={{
                transitionDelay: isMobileOpen ? `${index * 80}ms` : "0ms",
              }}
            >
              {link.name}
            </Link>
          ))}

          <div
            className={`pt-3 transform transition-all duration-500 ${
              isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{ transitionDelay: `${navLinks.length * 80}ms` }}
          >
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Logout ({user.username})
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Signup / Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
