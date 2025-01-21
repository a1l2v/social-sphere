import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [club, setClub] = useState("");
  const [photo, setPhoto] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [contact, setContact] = useState("");

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const { data } = await axios.get(`${apiUrl}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  const getAllClubs = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const { data } = await axios.get(`${apiUrl}/api/v1/club/get-club`);
      if (data?.success) {
        setClubs(data?.club);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching clubs");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllClubs();
  }, []);

  const validateForm = () => {
    if (!name) return "Name is Required";
    if (!description) return "Description is Required";
    if (!price) return "Price is Required";
    if (!category) return "Category is Required";
    if (!club) return "Club is Required";
    if (!teamSize) return "Team size is Required";
    if (!venue) return "Venue is Required";
    if (!eventDate) return "Event date is Required";
    if (!contact) return "Contact information is Required";
    if (photo && photo.size > 1000000) return "Photo should be less than 1MB";
    return null;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    const apiUrl = import.meta.env.VITE_API_URL;
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      const EventData = new FormData();
      EventData.append("name", name);
      EventData.append("description", description);
      EventData.append("price", price);
      EventData.append("photo", photo);
      EventData.append("category", category);
      EventData.append("club", club);
      EventData.append("team_size", teamSize);
      EventData.append("venue", venue);
      EventData.append("event_date", eventDate);
      EventData.append("contact", contact);

      const { data } = await axios.post(`${apiUrl}/api/v1/event/create-event`, EventData);
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/events");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <Layout title={"Dashboard - Create EVENT"}>
  <div className="w-full bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen">
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Admin Menu */}
        <div className="col-span-12 md:col-span-3">
          <AdminMenu />
        </div>

        {/* Main content for creating event */}
        <div className="col-span-12 md:col-span-9">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">Create Event</h1>

          <div className="space-y-7 w-full md:w-3/4">
            {/* Category Select */}
            <Select
              
              placeholder="Select a category"
              size="large"
              showSearch
              className="w-full "
              onChange={(value) => setCategory(value)}
              style={{
                
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/* Club Select */}
            <Select
              
              placeholder="Select a club"
              size="large"
              showSearch
              className="w-full mb-4"
              onChange={(value) => setClub(value)}
              style={{
                
              }}
            >
              {clubs?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/* Photo Upload */}
            <div>
              <label className="border-2 border-gray-300 bg-white py-3 px-4 rounded-md shadow-sm cursor-pointer w-full text-center">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            {/* Photo Preview */}
            {photo && (
              <div className="text-center mt-4">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  className="h-52 mx-auto object-cover rounded-md shadow-lg"
                />
              </div>
            )}

            {/* Event Details Inputs */}
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                placeholder="Event Name"
                className="border-2 border-gray-300 w-full px-4 py-3 text-lg rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                placeholder="Event Description"
                className="border-2 border-gray-300 w-full px-4 py-3 text-lg rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                placeholder="Event Price"
                className="border-2 border-gray-300 w-full px-4 py-3 text-lg rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="text"
                value={teamSize}
                placeholder="Team Size"
                className="border-2 border-gray-300 w-full px-4 py-3 text-lg rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setTeamSize(e.target.value)}
              />

              <input
                type="text"
                value={venue}
                placeholder="Venue"
                className="border-2 border-gray-300 w-full px-4 py-3 text-lg rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setVenue(e.target.value)}
              />

              <input
                type="date"
                value={eventDate}
                className="border-2 border-gray-300 w-full px-4 py-3 text-lg rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setEventDate(e.target.value)}
              />

              <input
                type="text"
                value={contact}
                placeholder="Contact Information"
                className="border-2 border-gray-300 w-full px-4 py-3 text-lg rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            {/* Create Event Button */}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md w-full shadow-md transition-transform duration-300 hover:scale-105"
              onClick={handleCreate}
            >
              CREATE EVENT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>


  );
};

export default CreateProduct;
