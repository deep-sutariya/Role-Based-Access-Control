import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogForm = ({ onSuccess, editData, setEditData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setContent(editData.content);
    }
  }, [editData]);

  // Handled update and create route in same function.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (editData) {
        await axios.put(
          `http://localhost:5000/api/blogs/${editData._id}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditData(null);
      } else {
        await axios.post(
          'http://localhost:5000/api/blogs',
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle('');
      setContent('');
      onSuccess();
    } catch (err) {
      alert('Failed to submit blog');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {editData ? 'Edit Blog Post' : 'Create Blog Post'}
      </h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full p-2 border rounded mb-3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editData ? 'Update' : 'Publish'}
        </button>
        {editData && (
          <button
            type="button"
            onClick={() => {
              setEditData(null);
              setTitle('');
              setContent('');
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BlogForm;
