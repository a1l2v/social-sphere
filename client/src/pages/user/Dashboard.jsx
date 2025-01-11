import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Dashboard = () => {
  const [auth] = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  // Fetch additional user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/user/profile`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto py-8 px-4 flex-1">
          <div className="grid grid-cols-12 gap-6">
            {/* Dashboard Content */}
            <div className="col-span-12 md:col-span-9">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                  Welcome, {auth?.user?.name || "User"}!
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold">Name:</h3>
                    <p className="text-sm">{auth?.user?.name}</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold">Email:</h3>
                    <p className="text-sm">{auth?.user?.email}</p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold">USN:</h3>
                    <p className="text-sm">{auth?.user?.usn}</p>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold">Phone Number:</h3>
                    <p className="text-sm">{auth?.user?.phoneNumber || "9990101788"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Ecommerce App. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Dashboard;
