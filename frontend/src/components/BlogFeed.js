import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch all the blogs
  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs').then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog Feed</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="mb-4 p-4 bg-white rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-700">{blog.content}</p>
            <p className="text-sm text-gray-500 mt-2">Author: {blog.author}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No blog posts found.</p>
      )}
    </div>
  );
};

export default BlogFeed;
