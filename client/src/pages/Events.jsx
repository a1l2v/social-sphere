import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

// Use the API URL from environment variables
const apiUrl = import.meta.env.VITE_API_URL;

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Initialize navigate
  const [cart, setCart] = useCart();

  // Fetch events from the backend
  const getAllEvents = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/event/get-event`);
      setEvents(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Layout>
      {/* Full Width Background Color */}
      <div className="w-full bg-gradient-to-r from-indigo-100 via-gray-100 to-indigo-200 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-indigo-800 mb-12" style={{ fontFamily: "Poppins, sans-serif" }}>
            Upcoming Events
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img
                  src={`${apiUrl}/api/v1/event/event-photo/${event._id}`}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-sm font-semibold text-indigo-600">Venue: {event.venue}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(event.event_date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Team Size: {event.team_size}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                      onClick={() => navigate(`/events/${event.slug}`)} // Navigate to event details
                    >
                      More Info
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                      onClick={() => {
                        setCart([...cart, event]);
                        localStorage.setItem("cart", JSON.stringify([...cart, event]));
                        navigate('/cart');
                        toast.success("Event Added to Cart");
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
