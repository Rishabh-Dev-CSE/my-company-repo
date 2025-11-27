import React, { useState } from "react";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  TableCellsIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

// Import Pages
import ControlPanel from "../control_panel/ControlPanelRoute";

const AdminPanelRoute = () => {
  const [active, setActive] = useState("Controls");

  const renderContent = () => {
    switch (active) {
      case "Controls":
        return <ControlPanel />;
      default:
        return <ControlPanel />;
    }
  };

  const menu = [
    { name: "Controls", icon: <HomeIcon className="h-5 w-5" /> },
  ];

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
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all 
                ${active === item.name
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col bg-gray-50">

        {/* Topbar */}
        <header className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {active}
          </h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <img
              src="https://randomuser.me/api/portraits/men/33.jpg"
              alt="User"
              className="w-9 h-9 rounded-full border border-gray-300"
            />
          </div>
        </header>

        {/* Dynamic Content */}
        <section className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </section>

      </main>
    </div>
  );
};

export default AdminPanelRoute;
