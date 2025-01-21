import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

// Importing the image
import signinImage from "./../assets/names/signin.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Social Sphere">
      <div className="flex min-h-screen">
        {/* Left side (Login Form) */}
        <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-8">
          <div className="w-full max-w-md">
            <h4 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
              Welcome Back!
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4 flex justify-between items-center">
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-300"
              >
                Login
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right side (Image) */}
        <div className="hidden md:flex w-1/2 justify-center items-center bg-blue-900">
          <div className="relative p-6">
            <img
              src={signinImage}
              alt="Sign In"
              className="w-full h-[500px] object-cover rounded-lg border-2 border-gray-300 shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-30 rounded-lg"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
