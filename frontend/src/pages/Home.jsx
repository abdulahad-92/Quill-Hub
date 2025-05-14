import React from "react";
import Navbar from "../components/Navbar";
import BlogSection from "../components/BlogSection";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie, removeCookies] = useCookies([]);
  const verifiedUser = cookies.id;
  return (
    <div>
      <Navbar
        logout={() => {
          removeCookies("jwt");
          removeCookies("id");
          setCookie("new", true);
          setCookie("verifiedUser", false);
          navigate("/login");
        }}
        verifiedUser={verifiedUser}
        register={() => navigate("/register")}
      />
      <BlogSection />
    </div>
  );
};

export default Home;
