import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="w-full bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Admin Menu */}
            <div className="col-span-12 md:col-span-3">
              <AdminMenu />
            </div>
            {/* Admin Details */}
            <div className="col-span-12 md:col-span-9">
              <div className="bg-white shadow-lg rounded-lg p-8 border-l-4 border-indigo-600">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Admin Details</h3>
                <div className="text-gray-700 space-y-4">
                  <p>
                    <span className="font-medium text-gray-900">Name:</span>{" "}
                    {auth?.user?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Email:</span>{" "}
                    {auth?.user?.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Contact:</span>{" "}
                    {auth?.user?.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
