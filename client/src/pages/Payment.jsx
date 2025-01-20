import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { ImSphere } from "react-icons/im";

const apiUrl = import.meta.env.VITE_API_URL;

export const Payment = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [authLoading, setAuthLoading] = useState(true);

  const fetchOrderDetails = async () => {
    if (!auth?.token) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/api/v1/order/get-order/${id}`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      });
      if (data.success) {
        setOrderDetails({
          orderId: id,
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

  useEffect(() => {
    if (auth?.token) {
      setAuthLoading(false);
    }
  }, [auth?.token]);

  useEffect(() => {
    if (!authLoading) {
      fetchOrderDetails();
    }
  }, [id, auth, authLoading]);

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
            <p className="text-sm text-gray-600">
              The Ultimate College Event Management Portal
            </p>
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
              <span className="font-semibold">Your Total:</span>
              <span className="text-lg font-bold text-indigo-700">
                ₹{orderDetails ? orderDetails.price : "Loading..."}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center text-base text-gray-700">
  <div className="flex flex-col items-center gap-1 mb-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z"
        fill="#4B5563"
      ></path>
      <path
        d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z"
        fill="#4B5563"
      ></path>
    </svg>
    <span>SocialSphere@gmail.com</span>
  </div>
  <div className="flex flex-col items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01..."
        fill="#4B5563"
      ></path>
    </svg>
    <span>Ph No - 8383838388</span>
  </div>
</div>
        </div>
      </div>
    </Layout>
  );
};
