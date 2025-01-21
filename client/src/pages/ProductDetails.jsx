import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart"; // Import useCart hook
import toast from "react-hot-toast"; // Import toast for notifications
import { FaCalendarAlt, FaMapPin, FaUsers, FaPhoneAlt, FaRegMoneyBillAlt } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart(); // Access cart context

  // Fetch product details when slug changes
  useEffect(() => {
    if (params?.slug) getProduct();
    
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/event/get-event/${params.slug}`
      );
      setProduct(data?.product);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add the event to the cart
  const addToCart = () => {
    setCart([...cart, product]); // Add the product to the cart
    localStorage.setItem("cart", JSON.stringify([...cart, product])); // Store cart in localStorage
    navigate('/cart'); // Navigate to the cart page
    toast.success("Event Added to Cart"); // Show success message
  };

  return (
    <Layout>
  {/* Full Width Background Color */}
  <div className="w-full max-w-screen-lg mx-auto flex justify-center px-4 mt-4 mb-4">
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-xl w-full">
      
      {/* Event Image and Details */}
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        
        {/* Event Image */}
        <div className="flex-shrink-0 h-[clamp(400.42px,27.7vw,480px)] w-[clamp(400.42px,27.7vw,480px)]">
          <img
            src={`${apiUrl}/api/v1/event/event-photo/${product._id}`}
            alt={product.name}
            className="rounded-lg h-full w-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="flex flex-col justify-between w-full md:w-[clamp(266px,27.7vw,500px)] space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>

          {/* Categories and Club */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm px-2 py-1 rounded-full border border-gray-300 text-gray-700 bg-gray-200">
              {product?.category?.name}
            </span>
            <span className="text-sm px-2 py-1 rounded-full border border-gray-300 text-gray-700 bg-gray-200">
              {product?.club?.name}
            </span>
          </div>

          {/* Event Metadata */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-700" />
              <p className="text-lg">
                Event Date: <span className="font-semibold">{new Date(product.event_date).toLocaleDateString()}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <FaMapPin className="text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-600">Venue</p>
                <p className="text-sm text-gray-700">{product.venue}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaRegMoneyBillAlt className="text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-600">Price</p>
                <p className="text-sm text-gray-700">₹{product.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaUsers className="text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-600">Team Size</p>
                <p className="text-sm text-gray-700">{product.team_size} members</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={addToCart} // Add product to cart
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Bottom Section (Description and Contact) */}
      <div className="mt-10 w-full max-w-[953px] space-y-8">
        {/* Event Description */}
        <div className="mb-8">
  <h2 className="text-2xl font-semibold text-gray-800">About the Event</h2>
  <p className="text-lg text-gray-700 mt-2">{product.description}</p> {/* Increased gap with mt-6 */}
</div>


        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Contact</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-700 mt-2" />
              <p className="text-lg font-medium text-gray-700 mt-2">{product.contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>

  

  );
};

export default ProductDetails;
