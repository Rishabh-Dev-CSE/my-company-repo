import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiLogIn,
  FiSettings,
  FiBriefcase,
  FiHome,
  FiFileText,
  FiClipboard,
  FiUsers,
  FiGrid,
  FiBookOpen,
  FiHelpCircle,
  FiList,
} from "react-icons/fi";
import { apiGet } from "../../utils/api";

// ✅ Role-based navigation (cleaned + meaningful icons)
const navItems = {
  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
    { name: "Restaurants", path: "/admin/restaurants", icon: FiUsers },
    { name: "Subscriptions", path: "/admin/subscriptions", icon: FiClipboard },
    { name: "Reports", path: "/admin/reports", icon: FiFileText },
  ],
  owner: [
    { name: "Dashboard", path: "/restaurant/dashboard", icon: FiGrid },
    { name: "Menu", path: "/restaurant/menu", icon: FiList },
    { name: "Tables & QR", path: "/restaurant/tables", icon: FiBookOpen },
    { name: "Orders", path: "/restaurant/orders", icon: FiBriefcase },
    { name: "Reports", path: "/restaurant/reports", icon: FiFileText },
  ],
  staff: [
    { name: "Kitchen Dashboard", path: "/staff/kitchen", icon: FiHome },
    { name: "Order History", path: "/staff/orders", icon: FiList },
  ],
  tour_user: [
    { name: "Home", path: "/", icon: FiHome },
    { name: "About", path: "/tour_about", icon: FiBookOpen },
    { name: "Support", path: "/Support", icon: FiHelpCircle },
  ],
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false);
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

  const role = user?.role?.toLowerCase() || "tour_user";
  const links = navItems[role] || [];

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to={links[0]?.path || "/"} className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-indigo-600 tracking-tight">
              {role === "admin" ? "Admin Panel" : "My Restaurant SaaS"}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center text-sm font-medium px-3 py-2 rounded-md transition-all ${
                  location.pathname === item.path
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" /> {item.name}
              </Link>
            ))}

            {user ? (
              <>
                <span className="text-gray-600 text-sm">
                  👋 {user.username} ({role})
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-200"
                >
                  <FiLogOut className="w-5 h-5 mr-1" /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all duration-200"
              >
                <FiLogIn className="w-5 h-5 mr-1" /> Login / Signup
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none transition-transform duration-300"
            >
              {isMenuOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-inner overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-2">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-700 hover:bg-indigo-50"
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" /> {item.name}
            </Link>
          ))}

          <hr className="my-2 border-gray-200" />

          {user ? (
            <button
              onClick={handleLogout}
              className="flex w-full items-center text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md font-medium transition-all"
            >
              <FiLogOut className="w-5 h-5 mr-2" /> Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="flex items-center text-green-600 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-md font-medium transition-all"
            >
              <FiLogIn className="w-5 h-5 mr-2" /> Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
