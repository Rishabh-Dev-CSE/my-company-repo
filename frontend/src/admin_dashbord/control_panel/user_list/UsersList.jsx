import React, { useEffect, useState } from "react";
import { apiGet, apiDelete, apiPost, apiUpdate } from "../../../utils/api";
import SuccessModal from "../../../module/cards/SuccessModal";
import ErrorModal from "../../../module/cards/ErrorModel";
import UpdateUserModal from "../../../module/cards/UpdateUserModal";

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const [successOpen, setSuccessOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Update User Modal
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        apiGet("/api/user/list/")
            .then((res) => {
                setUsers(res.data || []);
            })
            .catch((err) => {
                setError("Failed to fetch data");
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await apiDelete(`/api/user/delete/${id}/`);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            setSuccessMsg(res.message);
            setSuccessOpen(true);
        } catch (err) {
            setErrorMsg(err.message || "Unexpected error");
            setErrorOpen(true);
        }
    };

    // Open update modal with user data
    const handleOpenUpdate = (user) => {
        setSelectedUser(user);
        setUpdateOpen(true);
    };

    // Update user
    const handleUpdateUser = async (formData) => {
        if (!selectedUser) return;

        setUpdateLoading(true);

        try {
            const data = await apiUpdate(`/api/user/update/${selectedUser.id}/`, formData);

            // Update frontend list also
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === selectedUser.id ? { ...u, ...formData } : u
                )
            );

            setSuccessMsg(data.message || "User updated successfully");
            setSuccessOpen(true);
            setUpdateOpen(false);

        } catch (err) {

            setUpdateOpen(false);
            setErrorMsg(err.message || "Update failed");
            setErrorOpen(true);

        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDetails = () => {
         apiGet()
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">User List</h1>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
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
                                    <td className="py-2 px-4 border">{user.role}</td>

                                    <td className="py-2 px-4 border text-center space-x-2">
                                        <button
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                            onClick={() => handleOpenUpdate(user)}
                                        >
                                            Update
                                        </button>

                                        <button
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            onClick={() => {
                                                if (confirm("Are you sure you want to delete this user?")) {
                                                    handleDelete(user.id);
                                                }
                                            }}

                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                            onClick={() => handleDetails(user.id)}
                                        >
                                            details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">No users found</td>
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

            {/* Update Modal */}
            <UpdateUserModal
                open={updateOpen}
                userData={selectedUser || {}}
                loading={updateLoading}
                onClose={() => setUpdateOpen(false)}
                onSubmit={handleUpdateUser}
            />
        </div>
    );
}

export default UserList;
