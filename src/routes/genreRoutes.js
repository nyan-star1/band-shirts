// src/routes/genreRoutes.js
const express = require('express');
const { getGenres } = require('../controllers/genreController');
const router = express.Router();

router.get('/genres', getGenres);

module.exports = router;
