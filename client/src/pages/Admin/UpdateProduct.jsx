import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [club, setClub] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [contact, setContact] = useState("");

  // Get single product
  const getSingleProduct = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const { data } = await axios.get(
        `${apiUrl}/api/v1/event/get-event/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setTeamSize(data.product.team_size);
      setVenue(data.product.venue);
      setEventDate(data.product.event_date);
      setContact(data.product.contact);
      setCategory(data.product.category._id);
      setClub(data.product.club._id);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product details");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const { data } = await axios.get(`${apiUrl}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
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
      toast.error("Something went wrong in fetching categories");
    }
  };


  useEffect(() => {
    getAllCategory();
    getAllClubs();
  }, []);

  // Form validation
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

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("club", club);
      productData.append("team_size", teamSize);
      productData.append("venue", venue);
      productData.append("event_date", eventDate);
      productData.append("contact", contact);

      const { data } = await axios.put(
        `${apiUrl}/api/v1/event/update-event/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/events");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this product?");
      if (!answer) return;
      const apiUrl = import.meta.env.VITE_API_URL;
      const { data } = await axios.delete(
        `${apiUrl}/api/v1/event/event/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/events");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <AdminMenu />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="text-3xl font-semibold mb-6">Update Event</h1>

            <div className="space-y-4 w-full md:w-3/4">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <Select
                                bordered={true}
                                placeholder="Select a club"
                                size="large"
                                showSearch
                                className="w-full mb-4"
                                onChange={(value) => setClub(value)}
                                style={{ border: "2px solid #ddd", borderRadius: "0.375rem", padding: "0.5rem" }}
                              >
                                {clubs?.map((c) => (
                                  <Option key={c._id} value={c._id}>
                                    {c.name}
                                  </Option>
                                ))}
                              </Select>

              <div>
                <label className="border border-gray-300 bg-white py-2 px-4 rounded-md shadow-sm cursor-pointer w-full text-center">
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

              <div className="text-center">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="h-52 mx-auto object-cover"
                  />
                ) : (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/api/v1/event/event-photo/${id}`}
                    alt="product_photo"
                    className="h-52 mx-auto object-cover"
                  />
                )}
              </div>

              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="border border-gray-300 w-full px-4 py-2 rounded-md"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                placeholder="Product Description"
                className="border border-gray-300 w-full px-4 py-2 rounded-md"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                placeholder="Product Price"
                className="border border-gray-300 w-full px-4 py-2 rounded-md"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="text"
                value={teamSize}
                placeholder="Team Size"
                className="border border-gray-300 w-full px-4 py-2 rounded-md"
                onChange={(e) => setTeamSize(e.target.value)}
              />

              <input
                type="text"
                value={venue}
                placeholder="Venue"
                className="border border-gray-300 w-full px-4 py-2 rounded-md"
                onChange={(e) => setVenue(e.target.value)}
              />

              <input
                type="date"
                value={eventDate}
                className="border border-gray-300 w-full px-4 py-2 rounded-md"
                onChange={(e) => setEventDate(e.target.value)}
              />

              <input
                type="text"
                value={contact}
                placeholder="Contact Information"
                className="border border-gray-300 w-full px-4 py-2 rounded-md"
                onChange={(e) => setContact(e.target.value)}
              />

              <div className="space-y-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                  onClick={handleUpdate}
                >
                  UPDATE EVENT
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full"
                  onClick={handleDelete}
                >
                  DELETE EVENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;