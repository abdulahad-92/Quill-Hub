import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [cookies, setCookie, removeCookies] = useCookies([]);
  const author = cookies.username;
  const UserId = cookies.id;
  const quillRef = useRef(null);
  const navigate = useNavigate("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const handleFileChange = async (e) => {
    // Handle file upload logic here if needed
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const sendPost = async (e) => {
    e.preventDefault();
    const quillContent = quillRef.current.getEditor().getContents();
    try {
      const postData = {
        title,
        summary,
        author,
        content: content,
        photo: file,
        user: UserId,
      };

      const response = await axios.post(
        `http://localhost:4000/api/create`,
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Navbar
        logout={() => {
          removeCookies("jwt");
          removeCookies("id");
          setCookie("new", true);
          navigate("/login");
        }}
        register={() => navigate("/register")}
        name={cookies.username}
      />
      <form onSubmit={sendPost} className="px-2 py-2">
        <div>
          <input
            type="text"
            className="w-full p-1.5 border-[1px] border-slate-400 my-[0.5px]"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full p-1.5 border-[1px] border-slate-400 my-[0.5px]"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
            className="w-full p-1.5 border-[1px] border-slate-400 my-[0.5px]"
          />
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(e) => setContent(e)}
          modules={modules}
          formats={formats}
          ref={quillRef}
        />
        <button
          type="submit"
          className="bg-[black] text-white w-full p-2 rounded-xl font-semibold my-2 hover:opacity-[0.9]"
        >
          Create Post
        </button>
      </form>
    </>
  );
};

export default Create;
