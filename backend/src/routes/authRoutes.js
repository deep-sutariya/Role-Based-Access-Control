const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', protect, (req, res) => {
    const { _id, name, email, role } = req.user;
    res.status(200).json({ id: _id, name, email, role });
  });

module.exports = router;
