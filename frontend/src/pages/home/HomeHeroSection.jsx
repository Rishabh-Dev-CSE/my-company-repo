import React from "react";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";

const HomeHeroSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiGet("/api/user/")
      .then((data) => {
        console.log("User data:", data);
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      });
  }, []);

  return (
    <div>
      <>
        <div>
          <span className="text-sm text-gray-500">
            {user ? `👋 Hello, ${user.username} ${user.role}` : "Not logged in"}
          </span>


        </div>
      </>
    </div>
  );
}

export default HomeHeroSection;