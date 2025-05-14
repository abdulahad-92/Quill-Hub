import React, { useState } from "react";
import "../styles/AuthForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";

const Login = () => {
  const [cookies, setCookie, removeCookies] = useCookies([]);
  const [formData, setFormData] = useState({
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
        "http://localhost:4000/users/login",
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data) {
        if (data.errs) {
          const { email, password } = data.errs;
          if (email) generateErr(email);
          else if (password) generateErr(password);
        } else {
          setFormData({
            email: "",
            password: "",
          });
          toast.success("User has been logged in");
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
          <h2 className="text-2xl">Login</h2>
          <label htmlFor="username">Email</label>
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

          <button type="submit">Login</button>
          <span className="text-center">New user? </span>
          <a
            className="text-[dodgerblue] text-center cursor-pointer"
            href="/register"
          >
            register
          </a>
        </form>
      </div>
    </>
  );
};

export default Login;
