import React, { useEffect, useState } from "react";
import Blog from "./Blog";
const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from your API or database
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/api/getAll");
      const { data } = await response.json();
      setBlogPosts(data);
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-[70vw] mx-auto my-1 gap-2">
      {blogPosts &&
        blogPosts.map((blogPost) => {
          let url = "src/uploads/" + blogPost.img;
          return (
            <Blog
              key={blogPost._id}
              id={blogPost._id}
              title={blogPost.title}
              content={{
                summary: blogPost.summary,
                author: blogPost.author,
                date: blogPost.date,
                img: url,
              }}
            />
          );
        })}
    </div>
  );
};

export default BlogSection;
