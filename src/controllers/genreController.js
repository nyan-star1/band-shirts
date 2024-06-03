// src/controllers/genreController.js
const Item = require('../models/Item');

exports.getGenres = async (req, res) => {
  try {
    const genres = await Item.distinct('genre');
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching genres' });
  }
};
