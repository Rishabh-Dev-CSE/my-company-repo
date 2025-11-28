import { useState } from "react";
import { apiPost } from "../../../utils/api";
import SuccessModal from "../../../module/cards/SuccessModal";
import ErrorModal from "../../../module/cards/ErrorModel";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const [successOpen, setSuccessOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

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

            setSuccessMsg(data.message);
            setSuccessOpen(true);

            // Reset fields
            setUsername("");
            setPassword("");
            setRole("");
            setEmail("");

        } catch (err) {
            console.error("Signup error:", err);

            // Safely extract backend error
            const extractedError =
                err?.response?.data?.error ||
                err?.message ||
                "Something went wrong";

            setErrorMsg(extractedError);
            setErrorOpen(true);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center bg-gray-100">

            {/* Success Modal */}
            <SuccessModal
                open={successOpen}
                message={successMsg}
                buttonText="Go back to dashboard"
                onClose={() => setSuccessOpen(false)}
            />

            {/* Error Modal */}
            <ErrorModal
                open={errorOpen}
                message={errorMsg}
                buttonText="Okay"
                onClose={() => setErrorOpen(false)}
            />

            {/* Signup Card */}
            <div className="w-full max-w-md px-10 py-10 bg-white rounded-xl border border-gray-300 shadow-md">

                <form onSubmit={handleSignup} className="flex flex-col space-y-5">
                    <h1
                        className="text-[3.4vh] justify-center font-semibold"
                        style={{
                            textAlign: 'center',
                            padding: '10px'
                        }}
                    >
                        Add New User
                    </h1>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create password"
                            className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Select Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none transition"
                            required
                        >
                            <option value="" disabled>Choose role</option>
                            <option value="owner">Restaurant Owner</option>
                            <option value="staff">Kitchen Staff</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`py-2 rounded-lg font-medium bg-gray-800 text-white shadow-sm transition-all 
              ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-black hover:shadow-md"}`}
                    >
                        {loading ? "Creating..." : "Create User"}
                    </button>

                </form>
            </div>

            <div className="rounded-xl border border-gray-300 ms-10 w-full h-[50vh] shadow-md"></div>
        </div>
    );
}

export default Signup;
