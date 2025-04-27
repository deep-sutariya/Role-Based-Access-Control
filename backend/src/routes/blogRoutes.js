const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const protect = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');

// Public view all blogs
router.get('/', getBlogs);

// Admin only create, update, delete routes
router.post('/', protect, roleCheck(['admin']), createBlog);
router.put('/:id', protect, roleCheck(['admin']), updateBlog);
router.delete('/:id', protect, roleCheck(['admin']), deleteBlog);

module.exports = router;
