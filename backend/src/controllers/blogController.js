const Blog = require('../models/Blog');

// CURD operaitons on blog

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({
      title,
      content,
      author: req.user.name,
    });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    res.status(500).json({ message: "Error creating blog", error: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ message: "Error updating blog", error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err.message });
  }
};
