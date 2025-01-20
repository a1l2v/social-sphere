import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { FaUser, FaEnvelope, FaIdCard, FaPhone } from "react-icons/fa";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
  <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-gray-100 to-indigo-200 py-12 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8 space-y-6 transition-all duration-300 hover:shadow-xl">
      
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {/* Profile picture */}
          <div className="w-28 h-28 rounded-full bg-indigo-400 flex items-center justify-center text-white font-semibold text-xl">
            {auth?.user?.name?.charAt(0)}
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800">{auth?.user?.name}</h1>
        <p className="text-gray-900 text-lg">User Details</p>
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
          <FaIdCard className="text-green-500 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-600 font-medium">USN</p>
            <p className="text-gray-800 font-mono">{auth?.user?.usn}</p>
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

      {/* Action Button */}
      <div className="flex justify-center">
        {/* You can add any action button here */}
      </div>
    </div>
  </div>
</Layout>
  );
};

export default Dashboard;

