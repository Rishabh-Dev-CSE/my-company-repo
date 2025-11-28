import React, { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../../../utils/api";
import SuccessModal from "../../../module/cards/SuccessModal";
import ErrorModal from "../../../module/cards/ErrorModel";

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const [successOpen, setSuccessOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        apiGet("/api/user/list/")
            .then((res) => {
                setUsers(res.data || []);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch data");
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await apiDelete(`/api/user/delete/${id}/`);

            // Only remove row if backend returns success
            setUsers((prev) => prev.filter((u) => u.id !== id));

            setSuccessMsg(res.message);
            setSuccessOpen(true);

        } catch (err) {
            console.error("Delete error:", err);

            setErrorMsg(err.message || "Unexpected error occurred");
            setErrorOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">User List</h1>

            {error && (
                <div className="bg-red-200 text-red-700 px-4 py-2 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-4 border">User ID</th>
                            <th className="py-3 px-4 border">Username</th>
                            <th className="py-3 px-4 border">Email</th>
                            <th className="py-3 px-4 border">Role</th>
                            <th className="py-3 px-4 border text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{user.id}</td>
                                    <td className="py-2 px-4 border">{user.username}</td>
                                    <td className="py-2 px-4 border">{user.email}</td>
                                    <td className="py-2 px-4 border capitalize">{user.role}</td>

                                    <td className="py-2 px-4 border text-center space-x-2">
                                        <button
                                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            onClick={() =>
                                                (window.location.href = `https://localhost:8000/update/id=${user.id}`)
                                            }
                                        >
                                            update
                                        </button>

                                        <button
                                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <SuccessModal
                open={successOpen}
                message={successMsg}
                buttonText="Okay"
                onClose={() => setSuccessOpen(false)}
            />

            <ErrorModal
                open={errorOpen}
                message={errorMsg}
                buttonText="Okay"
                onClose={() => setErrorOpen(false)}
            />
        </div>
    );
}

export default UserList;
