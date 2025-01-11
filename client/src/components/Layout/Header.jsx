import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth"; // Import useAuth
import toast from "react-hot-toast";
import { useCart } from "../../context/cart"; // Import useCart
import { Badge } from "antd"; // Import Badge component from Ant Design

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart(); // Use auth context
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          🌍 Social Sphere
        </Link>

        {/* Hamburger Menu (for smaller screens) */}
        <button
          className="text-white md:hidden focus:outline-none"
          aria-label="Toggle navigation"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden transition-all transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={closeSidebar} className="text-white text-xl">
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center">
            <NavLink
              to="/"
              onClick={closeSidebar}
              className="py-2 px-4 text-white hover:text-gray-300"
            >
              Home
            </NavLink>
            <NavLink
              to="/events"
              onClick={closeSidebar}
              className="py-2 px-4 text-white hover:text-gray-300"
            >
              Events
            </NavLink>
            <NavLink
              to="/clubs"
              onClick={closeSidebar}
              className="py-2 px-4 text-white hover:text-gray-300"
            >
              Clubs
            </NavLink>
            <NavLink
              to="/cart"
              onClick={closeSidebar}
              className="py-2 px-4 text-white hover:text-gray-300"
            >
              <Badge count={cart?.length} showZero>
                Cart
              </Badge>
            </NavLink>

            {/* Conditional rendering based on authentication */}
            {!auth?.user ? (
              <>
                <NavLink
                  to="/register"
                  onClick={closeSidebar}
                  className="py-2 px-4 text-white hover:text-gray-300"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={closeSidebar}
                  className="py-2 px-4 text-white hover:text-gray-300"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <>
                {/* Dashboard Button for User/Admin */}
                <NavLink
                  to={auth.user.role === 1 ? "/dashboard/admin" : "/dashboard/user"}
                  onClick={closeSidebar}
                  className="py-2 px-4 text-white hover:text-gray-300"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  onClick={() => {
                    handleLogout();
                    closeSidebar();
                  }}
                  to="/login"
                  className="py-2 px-4 text-white hover:text-gray-300"
                >
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/clubs"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Clubs
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            <Badge count={cart?.length} showZero>
              Cart
            </Badge>
          </NavLink>

          {/* Conditional rendering based on authentication */}
          {!auth?.user ? (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={auth.user.role === 1 ? "/dashboard/admin" : "/dashboard/user"}
                className={({ isActive }) =>
                  `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                onClick={handleLogout}
                to="/login"
                className={({ isActive }) =>
                  `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
