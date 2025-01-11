import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="text-center">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h4>
        <div className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard/user/profile"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
