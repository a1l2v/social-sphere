import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { ImSphere } from "react-icons/im";

const apiUrl = import.meta.env.VITE_API_URL;

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      setAuthLoading(false);
    }
  }, [auth?.token]);

  useEffect(() => {
    if (!authLoading) {
      fetchOrderDetails();
    }
  }, [orderId, auth, authLoading]);

  const fetchOrderDetails = async () => {
    if (!auth?.token) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/api/v1/order/get-order/${orderId}`, {
        headers: { Authorization: `${auth.token}` },
      });
      if (data.success) {
        setOrderDetails({
          orderId,
          price: data.price,
        });
      } else {
        toast.error("Order not found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-indigo-100 via-gray-100 to-indigo-200 py-12">
        <div className="w-[400px] sm:w-[600px] bg-gradient-to-b from-white via-indigo-100 to-indigo-200 shadow-2xl rounded-3xl p-8">
          {/* Logo and Header */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="flex items-center justify-center bg-indigo-700 text-white w-20 h-20 rounded-full shadow-md">
              <ImSphere size={48} />
            </div>
            <h4 className="text-2xl font-bold text-indigo-800">SocialSphere</h4>
            <p className="text-sm text-gray-600">Your Order Receipt</p>
          </div>

          {/* Order Details */}
          <div className="border-b pb-6 mb-8">
            <div className="flex justify-between text-base text-gray-700 mb-4">
              <span className="font-semibold">Receipt No.:</span>
              <span>{orderDetails ? orderDetails.orderId : "Loading..."}</span>
            </div>
            <div className="flex justify-between text-base text-gray-700 mb-4">
              <span className="font-semibold">Customer:</span>
              <span>{auth.user?.name || "Guest"}</span>
            </div>
            <div className="flex justify-between text-base text-gray-700">
              <span className="font-semibold">Total Paid:</span>
              <span className="text-lg font-bold text-indigo-700">
                ₹{orderDetails ? orderDetails.price : "Loading..."}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center text-base text-gray-700">
            <p>Email: SocialSphere@gmail.com</p>
            <p>Phone: 8383838388</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;