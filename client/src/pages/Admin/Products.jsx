import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get API URL from environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/event/get-event`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  // Lifecycle method to load products
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Admin Menu */}
          <div className="col-span-12 md:col-span-3">
            <AdminMenu />
          </div>

          {/* Product List */}
          <div className="col-span-12 md:col-span-9">
            <h1 className="text-3xl font-semibold mb-6 text-center">
              All Events List
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/event/${p.slug}`}
                  className="hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={`${apiUrl}/api/v1/event/event-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                      <p className="text-gray-700 text-sm">
                        {p.description.length > 100
                          ? `${p.description.slice(0, 100)}...`
                          : p.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
