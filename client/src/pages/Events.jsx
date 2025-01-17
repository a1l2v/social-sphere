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
  const [filteredEvents, setFilteredEvents] = useState([]); // For filtered events
  const [clubs, setClubs] = useState([]); // Clubs state
  const [categories, setCategories] = useState([]); // Categories state
  const [selectedClub, setSelectedClub] = useState(""); // Selected club for filtering
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category for filtering
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Fetch events from the backend
  const getAllEvents = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/event/get-event`);
      setEvents(data.products);
      setFilteredEvents(data.products); // Initially show all events
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch clubs from the backend
  const getAllClubs = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/club/get-club`);
      if (data?.success) {
        setClubs(data?.club);
         // Store clubs with their IDs
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching clubs");
    }
  };

  // Fetch categories from the backend
  const getAllCategory = async () => {
    try {
      
      const { data } = await axios.get(`${apiUrl}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
        
         // Store clubs with their IDs
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  useEffect(() => {
    getAllEvents();
    getAllClubs(); // Fetch clubs on component mount
    getAllCategory(); // Fetch categories on component mount
    
  }, []);

  // Handle filtering events by club and category
  const filterEvents = (clubID, categoryID) => {
    let filtered = events;

    

    // Filter by club if selected
    if (clubID) {
      filtered = filtered.filter((event) => event.club === clubID);
      console.log(filtered);
    }

    // Filter by category if selected
    if (categoryID) {
      filtered = filtered.filter((event) =>{
        event.category._id === categoryID} );
      
    }
    

    setFilteredEvents(filtered);
  };

  // Handle club selection and filter events
  const handleClubChange = (clubID) => {
    setSelectedClub(clubID);
    filterEvents(clubID, selectedCategory);
  };

  // Handle category selection and filter events
  const handleCategoryChange = (categoryID) => {
    setSelectedCategory(categoryID);
    filterEvents(selectedClub, categoryID);
  };

  return (
    
    <Layout>
      <div className="w-full bg-gradient-to-r from-indigo-100 via-gray-100 to-indigo-200 py-12">
        <div className="container mx-auto text-center">
          <h1
            className="text-5xl font-bold text-indigo-800 mb-12"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Upcoming Events
          </h1>

          {/* Club Filter */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-indigo-800">Filter by Club</h3>
            <div className="flex justify-center space-x-4 mt-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="club"
                  value=""
                  checked={selectedClub === ""}
                  onChange={() => handleClubChange("")}
                  className="mr-2"
                />
                All
              </label>
              {clubs.map((club) => (
                <label key={club._id} className="flex items-center">
                  <input
                    type="radio"
                    name="club"
                    value={club._id}
                    checked={selectedClub === club._id}
                    onChange={() => handleClubChange(club._id)}
                    className="mr-2"
                  />
                  {club.name}
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-indigo-800">Filter by Category</h3>
            <div className="flex justify-center space-x-4 mt-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ""}
                  onChange={() => handleCategoryChange("")}
                  className="mr-2"
                />
                All
              </label>
              {categories.map((category) => (
                <label key={category._id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category._id}
                    checked={selectedCategory === category._id}
                    onChange={() => handleCategoryChange(category._id)}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <img
                  src={`${apiUrl}/api/v1/event/event-photo/${event._id}`}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-sm font-semibold text-indigo-600">
                    Venue: {event.venue}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(event.event_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Team Size: {event.team_size}
                  </p>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                      onClick={() => navigate(`/events/${event.slug}`)}
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
