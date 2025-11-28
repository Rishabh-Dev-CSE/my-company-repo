import React, { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { apiGet } from "../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

import ControlPanel from "../control_panel/ControlPanelRoute";

const AdminPanelRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  // Fetch Logged-in User Once
  useEffect(() => {
    apiGet("/api/user/")
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Sidebar Menu
  const menu = [
    { name: "Controls", path: "/admin/controls", icon: <HomeIcon className="h-5 w-5" /> },
  ];

  // Detect active item based on the URL
  const activeItem = menu.find((m) => location.pathname.startsWith(m.path))?.name;

  // Render based on route
  const renderContent = () => {
    if (location.pathname.startsWith("/admin/controls")) return <ControlPanel />;
    return <ControlPanel />;
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-6 py-5 text-xl font-bold text-blue-600 border-b border-gray-200">
          QraMg Admin
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activeItem === item.name
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-gray-50">

        {/* Topbar */}
        <header className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">{activeItem}</h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {user ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r 
                from-red-500 to-rose-600 hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Logout ({user.username}/{user.role})
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = "/auth/login")}
                className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r 
                from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 
                hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Signup / Login
              </button>
            )}
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </section>

      </main>
    </div>
  );
};

export default AdminPanelRoute;
