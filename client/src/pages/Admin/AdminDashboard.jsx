import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { FaUser, FaEnvelope, FaIdCard, FaPhone } from "react-icons/fa";

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
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-4 mb-6"> {/* Added mb-6 here for spacing */}
              <div className="relative">
                {/* Profile picture */}
                <div className="w-28 h-28 rounded-full bg-indigo-400 flex items-center justify-center text-white font-semibold text-xl">
                  {auth?.user?.name?.charAt(0)}
                </div>
              </div>
              <h1 className="text-3xl font-semibold text-gray-800">{auth?.user?.name}</h1>
            </div>

            {/* User Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <FaEnvelope className="text-blue-500 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Email</p>
                  <p className="text-gray-800 select-text">{auth?.user?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <FaPhone className="text-purple-500 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Phone</p>
                  <p className="text-gray-800 select-text">{auth?.user?.phoneNumber || "9990101788"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <FaUser className="text-purple-500 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">USER ID</p>
                  <p className="text-gray-800 select-text">{auth?.user?._id}</p>
                </div>
              </div>
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
