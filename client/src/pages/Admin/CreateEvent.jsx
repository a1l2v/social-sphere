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
        navigate("/dashboard/admin/products");
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
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create Event</h1>
          <form onSubmit={handleCreate} className="space-y-4">
            <Select
              bordered={false}
              placeholder="Select a category"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Select
              bordered={false}
              placeholder="Select a club"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(value) => setClub(value)}
            >
              {clubs?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md p-2 cursor-pointer focus:outline-none"
            />

            {photo && (
              <div className="text-center mt-4">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  className="h-52 mx-auto object-cover rounded-md"
                />
              </div>
            )}

            <input
              type="text"
              value={name}
              placeholder="Event Name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              value={description}
              placeholder="Event Description"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              value={price}
              placeholder="Event Price"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="text"
              value={teamSize}
              placeholder="Team Size"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(e) => setTeamSize(e.target.value)}
            />

            <input
              type="text"
              value={venue}
              placeholder="Venue"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(e) => setVenue(e.target.value)}
            />

            <input
              type="date"
              value={eventDate}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(e) => setEventDate(e.target.value)}
            />

            <input
              type="text"
              value={contact}
              placeholder="Contact Information"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              onChange={(e) => setContact(e.target.value)}
            />

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
              type="submit"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
