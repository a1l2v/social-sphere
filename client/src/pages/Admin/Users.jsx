import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/users`);
      if (data?.success) {
        setUsers(data.users);
      } else {
        console.error("Failed to fetch users:", data?.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
  <div className="w-full bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen">
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Admin Menu */}
        <div className="col-span-12 md:col-span-3">
          <AdminMenu />
        </div>

        {/* Users Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">All Users</h1>
            
            {/* Table Section */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50 cursor-pointer transition-all duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">{user._id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.role === 1 ? "Admin" : "User"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</Layout>

  );
};

export default Users;

