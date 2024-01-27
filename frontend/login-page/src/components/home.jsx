import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const host = import.meta.env.VITE_API_DEVELOPMENT_URL;;

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.post(
          `${host}/auth/getuser`,
          {},
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );

        setUser(response.data);
        console.log(user);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    return;
  };

  return (
    <div className="flex flex-col justify-center items-center h-lvh bg-gradient-to-br from-gray-700 via-gray-900 to-black">
      <button
        className="absolute top-4 right-4 text-white focus:outline-none"
        onClick={handleLogout}
      >
        <i className="material-icons">power_settings_new</i>
      </button>
      {user ? (
        <>
          <h2 className="text-white text-center font-poppins text-5xl my-5">
            Greetings, {user.name}!
          </h2>
          <p className="text-white font-poppins text-xl">
            You have successfully logged in.
          </p>
        </>
      ) : (
        <p className="text-white font-poppins text-xl">Loading...</p>
      )}
    </div>
  );
};

export default Home;
