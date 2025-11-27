import React, { useState } from "react";
import CreateUser from "./create_user/CreateUser";

const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState("create");

  const renderContent = () => {
    switch (activeTab) {
      case "create":
        return(
          <CreateUser />
        );
      case "update":
        return <div>Update User Form Area</div>;
      case "view":
        return <div>View User Details Area</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4">
      {/* Top Buttons */}
      <div className="flex gap-4 border p-3 rounded-lg bg-white shadow-sm">
        <button
          className={`px-4 py-2 rounded-lg border ${
            activeTab === "create"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create User
        </button>

        <button
          className={`px-4 py-2 rounded-lg border ${
            activeTab === "update"
              ? "bg-green-600 text-white border-green-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("update")}
        >
          Update User
        </button>

        <button
          className={`px-4 py-2 rounded-lg border ${
            activeTab === "view"
              ? "bg-gray-700 text-white border-gray-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("view")}
        >
          View User
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full mt-5 p-5 border rounded-xl bg-gray-50 min-h-[250px] shadow-inner">
        {renderContent()}
      </div>
      
    </div>
  );
};

export default ControlPanel;
