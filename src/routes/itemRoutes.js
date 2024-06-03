const express = require('express');
const { getItemById, getItemsByCategory, createItem, getNewArrivals, getItemsByGenre } = require('../controllers/itemController');
const { verifyToken } = require('../controllers/authController');
const router = express.Router();
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/new-arrivals', getNewArrivals);
router.get('/genre/:genre', getItemsByGenre);
router.get('/:itemId', getItemById);
router.post('/', authenticateJWT, authorizeAdmin, createItem);

module.exports = router;
