const express = require('express');
const { authenticateJWT, authorizeAdmin } = require('../controllers/authController');
const { createItem } = require('../controllers/itemController');
const router = express.Router();

// Use authenticateJWT to protect routes
router.use(authenticateJWT);

// Use authorizeAdmin to protect admin-specific routes
router.post('/items', authorizeAdmin, createItem);

module.exports = router;
