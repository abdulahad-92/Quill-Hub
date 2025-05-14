import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Blog = ({ title, content, id }) => {
  const navigate = useNavigate("");
  const date = new Date(content.date);

  let formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });
  formattedDate =
    formattedDate.split("at")[0] + "at" + "" + formattedDate.split("at")[1];

  return (
    <div
      className="flex w-full h-[40vh] cursor-pointer shadow-2xl shadow-[gray] border-[0px] border-gray bg-white rounded-2xl"
      onClick={() => navigate(`/post/${id}`)}
    >
      <div className="w-[40%] h-full">
        <img
          src={require(content.img)}
          alt={content.img}
          className="w-full h-full"
        />
      </div>
      <div className="blog-content flex flex-col w-[75%] h-full">
        <div className="w-full h-[40%]">
          <div className="text-2xl px-2 w-[100%] text-black font-bold">
            {title.length > 80 ? title.slice(0, 80) + "..." : title}
          </div>
          <span className="text-sm text-black font-semibold px-2 ">
            Written By {content.author}
          </span>
          <span className="text-[gray] text-sm">On {formattedDate}</span>
        </div>{" "}
        <div className="w-full h-[60%] text-base px-2 py-2">
          {content.summary.length > 250
            ? content.summary.slice(0, 280) + "..."
            : content.summary}
        </div>
      </div>
    </div>
  );
};

export default Blog;
