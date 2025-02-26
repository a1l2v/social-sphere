import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { orderId = "67bed457d4640a6ef78a8f8c" } = useParams();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/order/get-order/${orderId}`);
        if (data.success) {
          setPrice(data.price);
        } else {
          alert("Order not found!");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        alert("Failed to fetch order.");
        navigate("/");
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate, apiUrl]);

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Razorpay script loaded successfully.");
      setRazorpayLoaded(true);
    };
    script.onerror = () => console.error("❌ Failed to load Razorpay script.");
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK is not yet loaded. Please try again.");
      return;
    }

    setLoading(true);

    try {
      console.log("RAZORPAY_KEY_ID:", RAZORPAY_KEY_ID); // Debugging

      if (!RAZORPAY_KEY_ID) {
        alert("❌ Razorpay Key ID is missing in environment variables!");
        return;
      }

      // Step 1: Create Razorpay Order
      const { data } = await axios.post(`${apiUrl}/api/v1/payment/create-payment-order`, { orderId });

      console.log("🔹 Create Payment Order Response:", data); // Debugging

      if (!data.razorpayOrderId || !data.amount) {
        alert("❌ Invalid response from create-payment-order API!");
        return;
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount * 100, // Convert to paise
        currency: "INR",
        name: "E-Commerce Store",
        description: "Complete your order",
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          console.log("✅ Razorpay Payment Response:", response);

          try {
            const verifyRes = await axios.post(`${apiUrl}/api/v1/payment/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });

            console.log("🔹 Verify Payment Response:", verifyRes.data);

            if (verifyRes.data.success) {
              alert("✅ Payment successful!");
              navigate(`/order-success/${orderId}`);
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (error) {
            console.error("❌ Payment verification error:", error);
            alert("❌ Payment verification failed!");
          }
        },
        prefill: {
          name: "Alvin",
          email: "alvinst2005@gmail.com",
          contact: "9980101788",
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log("🛠 Initializing Razorpay Checkout...");
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("❌ Payment error:", error);
      alert("Failed to initialize payment.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-xl font-semibold">Order Checkout</h2>
        <p className="text-lg mt-2">Total Amount: ₹{price}</p>
        <button
          onClick={handlePayment}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          disabled={loading || !razorpayLoaded}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;
