import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from '../components/BlogForm';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

  //Fetch blog for common admin
  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchBlogs();
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <BlogForm onSuccess={fetchBlogs} editData={editBlog} setEditData={setEditBlog} />

      <div className="mt-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow p-4 rounded mb-4">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => setEditBlog(blog)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
