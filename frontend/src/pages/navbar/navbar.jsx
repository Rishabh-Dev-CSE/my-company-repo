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
    { name: "Term & cuddition", path: "/restaurant/term-coddintion" },
  ],
  staff: [
    { name: "Kitchen Dashboard", path: "/staff/kitchen" },
    { name: "Order History", path: "/staff/orders" },
  ],
  tour_user: [
    { name: "Home", path: "/" },
    { name: "About", path: "/tour_about" },
    { name: "Support", path: "/Support" },
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
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
          <img src="/logo.png" alt="Logo" className="w-9 h-9" />
          <span className="text-white">QraMg</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-medium">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              <Link to={link.path} className="hover:text-cyan-400">
                {link.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </div>
          ))}
        </nav>

        {/* Desktop Login/Logout */}
        <div className="hidden md:block">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-md"
            >
              Logout ({user.username})
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-md"
            >
              Signup / Login
            </button>
          )}
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="focus:outline-none relative w-6 h-6"
          >
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                isMobileOpen ? "rotate-45 top-2.5" : "top-1"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
                isMobileOpen ? "opacity-0" : "top-3"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                isMobileOpen ? "-rotate-45 top-2.5" : "top-5"
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#0f0c29] px-6 pb-6 overflow-hidden">
          <nav className="flex flex-col gap-4 py-4">
            {navLinks.map((link, index) => (
              <div key={index}>
                <Link
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-white hover:text-cyan-400"
                >
                  {link.name}
                </Link>
              </div>
            ))}

            <div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-5 py-2 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-md"
                >
                  Logout ({user.username})
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-md"
                >
                  Signup / Login
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
