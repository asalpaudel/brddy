import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../services/user';
import { toast } from 'react-toastify';
import { HiTrash } from 'react-icons/hi';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        getAllUsers()
            .then(setUsers)
            .catch(() => toast.error("Failed to fetch users."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete the user: ${userName}? This action cannot be undone.`)) {
            deleteUser(userId)
                .then(() => {
                    toast.success(`User ${userName} deleted successfully.`);
                    fetchUsers();
                })
                .catch(() => toast.error("Failed to delete user."));
        }
    };

    if (loading) {
        return <div className="text-center p-8">Loading users...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-stone-700 mb-6">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-amber-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Joined On</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-stone-700">
                        {users.map(user => (
                            <tr key={user.id} className="border-b hover:bg-amber-50">
                                <td className="py-3 px-4">{`${user.firstName} ${user.lastName}`}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleDelete(user.id, `${user.firstName} ${user.lastName}`)}
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="Delete user"
                                    >
                                        <HiTrash className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;