import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total;
    } catch (error) {
      console.error(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  // Handle order creation
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const productArray = cart.map((event) => ({ event: event._id }));
      const price = totalPrice();

      const response = await axios.post(
        `${apiUrl}/api/v1/order/create-order`,
        { cart: productArray, price }
      );

      const { data } = response;
      if (data?.success) {
        toast.success("Order created successfully!");
        navigate(`/payment/${data.order._id}`);
      } else {
        toast.error(data?.message || "Failed to create order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          toast.error("Unauthorized! Please log in again.");
          navigate("/login");
        } else {
          toast.error(data?.message || "Something went wrong!");
        }
      } else {
        toast.error("Network error! Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page px-4 py-8 bg-gray-100 min-h-screen">
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-extrabold drop-shadow-md ${
              auth?.user?.name === "admin"
                ? "text-blue-500"
                : "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
            }`}
          >
            {auth?.user ? `Hello, ${auth.user.name === "admin" ? "Admin" : auth.user.name}` : "Welcome, Guest"}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            {cart?.length
              ? `You have ${cart.length} item(s) in your cart. ${
                  auth?.token ? "" : "Please log in to checkout."
                }`
              : "Your cart is currently empty."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart?.map((p) => (
              <div
                className="flex items-center border p-4 rounded-lg shadow-md bg-white"
                key={p._id}
              >
                <img
                  src={`${apiUrl}/api/v1/event/event-photo/${p._id}`}
                  alt={p.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-lg">{p.name}</h2>
                  <p className="text-gray-600 text-sm">
                      {p.description ? p.description.substring(0, 30) : "No description available"}...
                  </p>
                  <p className="text-green-600 font-medium">
                    Price: ₹{p.price}
                  </p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Cart Summary</h2>
            <hr />
            <h4 className="text-lg">Total: ₹{totalPrice()}</h4>
            {auth?.token ? (
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                disabled={loading}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
