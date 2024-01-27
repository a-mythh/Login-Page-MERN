import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Heading from "./heading.jsx";
import LoginForm from "./loginForm.jsx";
import SideImage from "./sideImage.jsx";
import SignupForm from "./signupForm.jsx";

const host = "http://localhost:3000";

const FirstScreen = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      if (signupData.password !== signupData.confirmPassword) {
        alert("Passwords do not match. Check the password again.");
        return;
      }

      const response = await axios.post(`${host}/auth/signup`, signupData);
      console.log("Signup Response:", response.data);

      if (response.data.success == true) {
        localStorage.setItem("token", response.data.authToken);
        navigate("/home");
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${host}/auth/login`, loginData);
      console.log("Login Response:", response.data);

      if (response.data.success == true) {
        localStorage.setItem("token", response.data.authToken);
        navigate("/home");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const onChangeSignup = (event) => {
    setsignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeLogin = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignupClick = () => {
    setShowSignupForm(!showSignupForm);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [])
  

  return (
    <div className="flex flex-col-reverse justify-end items-center sm:flex-row h-screen">
      <div className="font-notoSans w-4/5 flex flex-wrap flex-col justify-center items-center content-center sm:h-screen">
        <Heading showSignupForm={showSignupForm} />

        {showSignupForm ? (
          <SignupForm
            handleChange={onChangeSignup}
            handleSubmit={handleSignup}
          />
        ) : (
          <LoginForm handleChange={onChangeLogin} handleSubmit={handleLogin} />
        )}

        <div className="flex justify-center m-2">
          <p>
            {showSignupForm
              ? "Already have an account?"
              : "Don't have an account?"}
            &nbsp;
          </p>
          <button
            type="button"
            className="focus:outline-none focus:text-teal-600 hover:text-teal-600 text-teal-500 font-medium"
            onClick={handleSignupClick}
          >
            {showSignupForm ? "Login" : "Sign up"}
          </button>
        </div>
      </div>

      <SideImage />
    </div>
  );
};

export default FirstScreen;
