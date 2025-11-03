import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { AuthContext } from "../../module/content/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // 👈 added
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select your role.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        const userInfo = {
          username: data.username || username,
          role: role,
        };

        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));

        alert("Login successful!");

        // Redirect based on role
        switch (role.toLowerCase()) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "owner":
          case "restaurant owner":
            navigate("/restaurant/dashboard");
            break;
          case "staff":
          case "kitchen staff":
            navigate("/staff/kitchen");
            break;
          default:
            navigate("/customer/orders");
            break;
        }
      } else {
        alert(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a002b] via-[#11004a] to-[#1a003b] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-[-10rem] left-[-10rem] w-[400px] h-[400px] bg-blue-700/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10rem] right-[-10rem] w-[400px] h-[400px] bg-purple-700/30 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-md px-8 py-10 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
          <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
            Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col space-y-6">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />

            {/* 👇 Role Dropdown */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Superadmin</option>
              <option value="owner">Restaurant Owner</option>
              <option value="staff">Kitchen Staff</option>
              <option value="customer">Customer</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
