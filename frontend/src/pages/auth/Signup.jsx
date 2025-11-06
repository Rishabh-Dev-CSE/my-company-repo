import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { apiPost } from "../../utils/api";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiPost("/api/signup/", {
        username,
        password,
        role,
        email,
      });

      alert(data.message || data.error);
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a002b] via-[#11004a] to-[#1a003b] relative overflow-hidden">
        {/* Glowing background */}
        <div className="absolute top-[-10rem] left-[-10rem] w-[400px] h-[400px] bg-blue-700/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10rem] right-[-10rem] w-[400px] h-[400px] bg-purple-700/30 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-md px-8 py-10 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
          <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
            Create Account
          </h2>

          <form onSubmit={handleSignup} className="flex flex-col space-y-6">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            >
              <option value="">Select Role</option>
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
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
