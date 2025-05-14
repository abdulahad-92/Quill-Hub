import React, { useState } from "react";
import "../styles/AuthForm.scss";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";

const Register = () => {
  const [cookies, setCookie, removeCookies] = useCookies([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const generateErr = (err) => {
    toast.error(err, { position: "top-right" });
    console.log(err);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/users/register",
        { ...formData },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.errs) {
          const { username, email, password } = data.errs;
          if (email) generateErr(email);
          else if (password) generateErr(password);
          else if (username) generateErr(username);
        } else {
          setFormData({
            username: "",
            email: "",
            password: "",
          });
          toast.success("User has been registered");
          setCookie("verifiedUser", true);
          navigate("/");
        }
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar auth={false} register={() => navigate("/register")} />
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="text-2xl">Sign Up</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
          <span className="text-center">Already have an account? </span>
          <a
            className="text-[dodgerblue] text-center cursor-pointer"
            href="/login"
          >
            login
          </a>
        </form>
      </div>
    </>
  );
};

export default Register;
