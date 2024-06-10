const express = require('express');
const { getItemById, getItemsByGenre, createItem, getNewArrivals } = require('../controllers/itemController');
const { authenticateJWT, authorizeAdmin } = require('../controllers/authController');
const router = express.Router();

router.get('/new-arrivals', getNewArrivals);
router.get('/genre/:genre', getItemsByGenre);
router.get('/:itemId', getItemById);
router.post('/', authenticateJWT, authorizeAdmin, createItem);

module.exports = router;
