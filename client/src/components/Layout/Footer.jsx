import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full">
      <div className="container mx-auto px-10">
        <div className="flex flex-wrap justify-between">
          {/* Logo and About */}
          <div className="w-full md:w-1/2 mb-4 text-center md:text-left">
            <h2 className="text-xl font-semibold mb-2">Social Sphere</h2>
            <p className="text-gray-400 text-sm mx-auto md:mx-0">
              The Social Sphere is a comprehensive web application that solves the problem of scattered communication regarding college events. It acts as a centralized hub where students can access detailed information about upcoming events, register with ease, and explore university clubs.
            </p>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2 mb-4 text-center md:text-left px-40">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-400 text-sm mb-2">Email: contact@socialsphere.com</p>
            <p className="text-gray-400 text-sm mb-2">Phone: +123 987 6543</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
