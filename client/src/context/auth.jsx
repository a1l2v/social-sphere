import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Set Axios Authorization Header
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth?.token]);

  // Initialize Auth from Local Storage
  useEffect(() => {
    const storedData = localStorage.getItem("auth");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.user && parsedData?.token) {
        setAuth(parsedData);
      }
    }
  }, []);

  // Update localStorage whenever auth changes
  useEffect(() => {
    if (auth?.user && auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth"); // Clear localStorage on logout
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for Accessing Auth Context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
