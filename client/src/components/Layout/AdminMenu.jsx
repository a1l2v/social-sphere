import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center bg-gray-100 p-6 rounded-md shadow-md">
      <h4 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h4>
      <div className="flex flex-col gap-4">
        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md text-lg font-medium ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Manage Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-Event"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md text-lg font-medium ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Create Event
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md text-lg font-medium ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/events"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-md text-lg font-medium ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Manage Events
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
