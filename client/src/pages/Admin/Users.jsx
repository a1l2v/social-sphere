import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="w-full bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-12 gap-6">
            {/* Admin Menu */}
            <div className="col-span-12 md:col-span-3">
              <AdminMenu />
            </div>
            {/* Users Content */}
            <div className="col-span-12 md:col-span-9">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                  All Users
                </h1>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          ID
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Email
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Updated Rows with Provided Data */}
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-700">676f9382d7ac6683bbf3e494</td>
                        <td className="px-4 py-2 text-sm text-gray-700">admin</td>
                        <td className="px-4 py-2 text-sm text-gray-700">admin@gmail.com</td>
                        <td className="px-4 py-2 text-sm text-gray-700">Admin</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-700">676f99f6c8f3ce3067ea8a6a</td>
                        <td className="px-4 py-2 text-sm text-gray-700">normal</td>
                        <td className="px-4 py-2 text-sm text-gray-700">normal@gmail.com</td>
                        <td className="px-4 py-2 text-sm text-gray-700">User</td>
                      </tr>
                      {/* Add more rows dynamically here if needed */}
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
