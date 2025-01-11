import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const apiUrl = import.meta.env.VITE_API_URL;

export const Payment = () => {
  const { id } = useParams(); // Get order_id from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch order details using the order_id
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/api/v1/order/get-order/${id}`); // API call to fetch order details
      if (data.success) {
        setOrderDetails({
          orderId: id,
          price: data.price, // Set the price from the response
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to fetch order details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handlePayment = async () => {
    if (!orderDetails) {
      toast.error('Order details are not available');
      return;
    }

    try {
      // Call your backend to create an order
      const response = await axios.post(`${apiUrl}/api/v1/payment/create-order`, {
        amount: orderDetails.price * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
      });

      const { order_id } = response.data;

      // Initialize Razorpay payment window
      const options = {
        key: "rzp_test_fQm1HYzuyjnkOe", // Your Razorpay key ID
        amount: orderDetails.price * 100, // Amount in paise
        currency: "INR",
        order_id: order_id, // The order ID received from the backend
        description: "Order Payment",
        handler: function (response) {
          // Handle successful payment response
          console.log(response);
          toast.success("Payment successful!");
        },
        prefill: {
          name: "Alvin S T", // Prefill user details
          email: "alvinst2005@gmail.com",
          contact: "9910101788",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options); // Initialize Razorpay with options
      rzp.open(); // Open Razorpay payment modal

    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment');
    }
  };

  return (
    <Layout>
      <div className="payment-container px-4 py-8">
        <h1 className="text-2xl font-semibold">Payment</h1>
        {loading ? (
          <div>Loading order details...</div>
        ) : orderDetails ? (
          <div>
            <div className="order-summary mb-4">
              <h2 className="text-xl font-semibold">Order ID: {orderDetails.orderId}</h2>
              <p className="text-lg">Price: ${orderDetails.price}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        ) : (
          <div>Order not found</div>
        )}
      </div>
    </Layout>
  );
};