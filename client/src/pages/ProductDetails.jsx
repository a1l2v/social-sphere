import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart"; // Import useCart hook
import toast from "react-hot-toast"; // Import toast for notifications

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
      <div className="w-full bg-gradient-to-r from-indigo-100 via-gray-100 to-indigo-200 py-8">
        <div className="container mx-auto mt-10 px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src={`${apiUrl}/api/v1/event/event-photo/${product._id}`}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg shadow-lg border-4 border-gray-300 transition-all transform hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
              {/* Event Title - Custom Font */}
              <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {product.name}
              </h1>

              <p className="text-lg text-gray-600">{product.description}</p>

              <div className="text-gray-800 space-y-2">
                <p className="text-xl font-medium">Price: ${product.price}</p>
                <p className="text-lg">Category: <span className="font-semibold">{product?.category?.name}</span></p>
                <p className="text-lg">Team Size: {product.team_size}</p>
                <p className="text-lg">Venue: {product.venue}</p>
                <p className="text-lg">
                  Event Date:{" "}
                  <span className="font-semibold">
                    {new Date(product.event_date).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-lg">Contact: {product.contact}</p>
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
