import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { ImSphere } from "react-icons/im";

const HomePage = () => {
  return (
    <Layout>
    <div className="bg-gradient-to-r from-gray-100 via-blue-100 to-pink-100 min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto text-center pt-40 pb-70 flex flex-col items-center justify-center">
        {/* Scalable Globe Icon */}
        <ImSphere size="8vw" className="mb-10" />
        <h1 className="text-8xl font-bold animate-bounce text-blue-600">
          Welcome to Social Sphere
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          The Ultimate College Event Management Portal
        </p>
        <div className="mt-20 ">
          <Link
            to="/events"
            className="bg-blue-200 hover:bg-blue-300  py-3 px-6 rounded-md text-lg font-semibold text-gray-800 animate-pulse"
          >
            Explore Events
          </Link>
        </div>
      </div>
  
      {/* Features Section */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Why Social Sphere?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Feature 1 */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Event Discovery</h3>
            <p>Discover the latest college events and find what suits your interests.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Easy Registration</h3>
            <p>Register for events seamlessly, manage your participation, and track event points.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Social Engagement</h3>
            <p>Connect with other students, discuss events, and share experiences.</p>
          </div>
        </div>
      </section>
  
      {/* Call to Action */}
      <section className="bg-pink-100 py-16 text-center">
        <h2 className="text-4xl font-bold text-blue-600 animate-fade-in">
          Get Started with Social Sphere Today!
        </h2>
        <p className="mt-4 mb-8 text-gray-600">
          Join us and make the most of your college life.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-600 py-3 px-6 rounded-md text-lg font-semibold transition-transform duration-300 hover:scale-105"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  </Layout>
  );
};


export default HomePage;
//<Layout>
//      <div className="bg-gradient-to-r from-gray-100 via-blue-100 to-pink-100 min-h-screen text-gray-800">
//        {/* Hero Section */}
//        <div className="container mx-auto text-center py-20">
//          <h1 className="text-5xl font-bold animate-bounce text-blue-600">
//            Welcome to Social Sphere
//          </h1>
//          <p className="mt-6 text-lg md:text-xl text-gray-600">
//            The Ultimate College Event Management Portal
//          </p>
//          <div className="mt-8">
//            <Link
//              to="/events"
//              className="bg-blue-200 hover:bg-blue-300 py-3 px-6 rounded-md text-lg font-semibold text-gray-800 animate-pulse"
//            >
//              Explore Events
//            </Link>
//          </div>
//        </div>
//
//        {/* Features Section */}
//        <section className="container mx-auto py-12 px-6">
//          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
//            Why Social Sphere?
//          </h2>
//          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//            {/* Feature 1 */}
//            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
//              <h3 className="text-xl font-semibold mb-4">Event Discovery</h3>
//              <p>Discover the latest college events and find what suits your interests.</p>
//            </div>
//            {/* Feature 2 */}
//            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
//              <h3 className="text-xl font-semibold mb-4">Easy Registration</h3>
//              <p>Register for events seamlessly, manage your participation, and track event points.</p>
//            </div>
//            {/* Feature 3 */}
//            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
//              <h3 className="text-xl font-semibold mb-4">Social Engagement</h3>
//              <p>Connect with other students, discuss events, and share experiences.</p>
//            </div>
//          </div>
//        </section>
//
//        {/* Call to Action */}
//        <section className="bg-pink-100 py-16 text-center">
//          <h2 className="text-4xl font-bold text-blue-600 animate-fade-in">
//            Get Started with Social Sphere Today!
//          </h2>
//          <p className="mt-4 mb-8 text-gray-600">
//            Join us and make the most of your college life.
//          </p>
//          <Link
//            to="/register"
//            className="bg-white text-blue-600 py-3 px-6 rounded-md text-lg font-semibold transition-transform duration-300 hover:scale-105"
//          >
//            Sign Up Now
//          </Link>
//        </section>
//      </div>
//    </Layout>