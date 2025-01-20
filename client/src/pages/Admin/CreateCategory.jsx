import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Base API URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handle form submit for creating category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/api/v1/category/create-category`, { name });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating category");
    }
  };

  // Fetch all categories

  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle category update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${apiUrl}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating category");
    }
  };

  // Handle category delete
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`${apiUrl}/api/v1/category/delete-category/${pId}`);
      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting category");
    }
  };

  return (
<Layout title={"Dashboard - Create Category"}>
  <div className="w-full bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 min-h-screen">
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Admin Menu */}
        <div className="col-span-12 md:col-span-3">
          <AdminMenu />
        </div>

        {/* Main content for managing categories */}
        <div className="col-span-12 md:col-span-9">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Category</h1>

          {/* Category Form */}
          <div className="p-6 w-full md:w-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-md mb-6">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>

          {/* Category Table */}
          <div className="w-full md:w-3/4 mt-6 bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="border-2 border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="border-2 border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <tr key={c._id} className="hover:bg-indigo-50 cursor-pointer transition-all duration-200">
                    <td className="border-2 border-gray-300 px-6 py-3 text-sm text-gray-700">{c.name}</td>
                    <td className="border-2 border-gray-300 px-6 py-3 text-sm text-gray-700">
                      <div className="flex justify-center space-x-4">
                        <button
                          className="px-4 py-2 bg-blue-400 rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 bg-red-400 rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for editing category */}
          <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</Layout>




  );
};

export default CreateCategory;
