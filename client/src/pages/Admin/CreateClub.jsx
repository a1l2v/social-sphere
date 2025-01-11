import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";

const CreateClub = () => {
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Admin Menu */}
          <div className="col-span-12 md:col-span-3">
            <AdminMenu />
          </div>
          {/* Create Product Content */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Create Product
              </h1>
              <form className="space-y-4">
                {/* Product Name */}
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter product name"
                  />
                </div>
                {/* Product Price */}
                <div>
                  <label
                    htmlFor="productPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Price
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter product price"
                  />
                </div>
                {/* Product Description */}
                <div>
                  <label
                    htmlFor="productDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="productDescription"
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
                {/* Upload Image */}
                <div>
                  <label
                    htmlFor="productImage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="productImage"
                    className="mt-1 block w-full text-gray-600 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};
export default CreateClub;
