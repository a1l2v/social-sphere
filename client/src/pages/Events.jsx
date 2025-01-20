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

  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [searchSuggestions, setSearchSuggestions] = useState([]); // Search suggestions

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

      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  useEffect(() => {
    getAllEvents();

    getAllClubs();
    getAllCategory();
  }, []);

  // Handle filtering events by club, category, and search query
  const filterEvents = (clubID, categoryID, query) => {
    let filtered = events;

    if (clubID) {
      filtered = filtered.filter((event) => event.club === clubID);
      console.log(filtered);

    }

    if (categoryID) {

      filtered = filtered.filter((event) => event.category._id === categoryID);
    }

    if (query) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };


  // Handle search input change
  const handleSearchChange = (query) => {
    setSearchQuery(query);

    // Update search suggestions
    if (query) {
      const suggestions = events.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }

    // Filter events
    filterEvents(selectedClub, selectedCategory, query);
  };

  // Handle selection from the dropdown
  const handleSuggestionSelect = (eventName) => {
    setSearchQuery(eventName);
    setSearchSuggestions([]);
    filterEvents(selectedClub, selectedCategory, eventName);
  };

  // Handle club selection
  const handleClubChange = (clubID) => {
    setSelectedClub(clubID);
    filterEvents(clubID, selectedCategory, searchQuery);
  };

  // Handle category selection
  const handleCategoryChange = (categoryID) => {
    setSelectedCategory(categoryID);
    filterEvents(selectedClub, categoryID, searchQuery);

  };

  return (
    
    <Layout>
      <div className="w-full bg-gradient-to-r from-indigo-100 via-gray-100 to-indigo-200 py-12">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <h1 className="text-4xl font-bold text-indigo-800 mb-6 text-center">Upcoming Events</h1>
            <input
              type="text"
              placeholder="Search events by name..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 z-10 bg-white border border-gray-300 rounded-lg mt-2 w-full">
                {searchSuggestions.map((event) => (
                  <div
                    key={event._id}
                    onClick={() => handleSuggestionSelect(event.name)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {event.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex">
            {/* Sidebar Filters */}
            <div className="w-1/4 p-6 bg-white rounded-lg shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Filter by Club</h3>
                <div className="space-y-2">
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
              <div>
                <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Filter by Category</h3>
                <div className="space-y-2">
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
            </div>

            {/* Events Grid */}
            <div className="w-3/4 ml-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <img
                    src={`${apiUrl}/api/v1/event/event-photo/${event._id}`}
                    alt={event.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">{event.name}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-sm font-semibold text-indigo-600">
                      Venue: {event.venue}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(event.event_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Team Size: {event.team_size}</p>
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
                          navigate("/cart");
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
      </div>
    </Layout>
  );
};

export default Events;

