import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Delete = () => {
  const params = useParams();
  const navigate = useNavigate("");

  const sendPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete/${params.id}`
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-[#00000016] relative">
      <form
        onSubmit={sendPost}
        className="px-2 w-[60vw] h-[30vh] absolute top-[35vh] left-[20vw]"
      >
        <div className="relative">
          <ImCancelCircle
            className="text-[red] absolute right-1 bottom-2 text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <button
          type="submit"
          className="bg-[black] text-white w-full p-2 rounded-xl font-bold my-2 hover:opacity-[0.96]"
        >
          Delete this post
        </button>
      </form>
    </div>
  );
};

export default Delete;
