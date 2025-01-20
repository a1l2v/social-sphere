import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const apiUrl = import.meta.env.VITE_API_URL;

const ClubsList = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add error state

  const getAllClubs = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/club/get-club`);
      setClubs(data.club);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false in case of error
      setError("Failed to load clubs. Please try again later.");
    }
  };

  useEffect(() => {
    getAllClubs();
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-indigo-100 to-white min-h-screen">
        <h1 className="text-center text-4xl font-extrabold text-indigo-700 py-8 drop-shadow-md">
          Clubs at BMSCE
        </h1>
        
        {loading ? (
          <div className="text-center text-gray-600">Loading clubs...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {clubs.length > 0 ? (
              clubs.map((club) => (
                <div
                  key={club._id}
                  className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-center md:justify-start">
                    <img
                      src={`${apiUrl}/api/v1/club/club-photo/${club._id}`}
                      alt={club.name}
                      className="object-contain"
                      style={{ width: "500px", height: "500px" }} // Resize to specific resolution
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
                    {club.name}
                  </h3>
                  <p
                    className="text-base text-black font-light leading-loose tracking-wide text-center"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {club.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">
                No clubs found. Please check back later.
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClubsList;

