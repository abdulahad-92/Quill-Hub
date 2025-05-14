import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/BlogPost.scss";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useCookies } from "react-cookie";

const Post = () => {
  const [cookies, setCookie, removeCookies] = useCookies([]);
  const [blogPost, setBlogPost] = useState({
    title: "",
    author: "",
    date: "",
    content: { ops: [] },
    imageUrl: "",
  });
  const [formattedDate, setFormattedDate] = useState("");
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const params = useParams();

  useEffect(() => {
    // Fetch blog posts from your API or database
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/api/getOne/${params.id}`
      );
      const { data } = await response.json();
      setBlogPost({
        title: data.title,
        author: data.author,
        date: data.date,
        imageUrl: data.img,
        content: data.content,
        id: data._id,
      });
      const temp = "/src/uploads/" + data.img;
      setUrl(temp);
      let date = new Date(data.date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
      setFormattedDate(date);
      let tem = data.user === cookies.id ? true : false;
      setShow(tem);
      console.log(data.content, data.user, tem);
    };

    fetchData();
  }, []);
  return (
    <div className="blog-post-container">
      <h1 className="text-center font-bold p-2 text-4xl text-black">
        {blogPost.title}
      </h1>
      <div className="post-meta text-center">
        <p className="author font-semibold text-black">{`By ${blogPost.author}`}</p>
        <p className="date">{formattedDate}</p>
        {show && (
          <div className="flex justify-between pl-10 pr-10 items-center gap-2 ">
            <Link
              to={`/edit/${blogPost.id}`}
              className="flex items-center gap-2 text-black text-3xl"
            >
              Edit
              <FaRegEdit />
            </Link>
            <Link
              to={`/delete/${blogPost.id}`}
              className="flex items-center gap-2 text-[red] text-4xl"
            >
              <MdDeleteOutline />
            </Link>
          </div>
        )}
      </div>
      {blogPost.imageUrl && (
        <div className="wrapper">
          <img
            src={require(url)}
            alt="Blog post"
            className="blog-image px-10"
          />
        </div>
      )}
      <div
        className="px-10 py-3"
        dangerouslySetInnerHTML={{ __html: blogPost.content }}
      />
    </div>
  );
};

export default Post;
