import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(null); // Initialize as `null` to avoid early redirection
  const [auth] = useAuth();
const authCheck = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${apiUrl}/api/v1/auth/user-auth`, {
          headers: {
            Authorization: `${auth?.token}`,
          },
        });
        console.log(auth?.token);
        setOk(res.data.ok); // Only set `ok` if the response is valid
      } catch (error) {
        setOk(false); // If there's an error, assume unauthorized
      }
    };
  useEffect(() => {
    

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false); // If no token, set `ok` to `false` directly
    }
  }, [auth?.token]);

  // While `ok` is `null`, show a loading spinner
  //if (ok === null) return <Spinner />;

  // If authorized, render the child route; otherwise, redirect to login
  //return ok ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
}