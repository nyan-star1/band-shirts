const Item = require('../models/Item');

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    res.status(500).send('Server error');
  }
};


exports.getItemsByGenre = async (req, res) => {
  try {
    const items = await Item.find({ genre: req.params.genre });
    res.json(items);
  } catch (error) {
    console.error('Error fetching items by genre:', error);
    res.status(500).send('Server error');
  }
};

exports.createItem = async (req, res) => {
  const { title, description, image, category, genre } = req.body;
  try {
    const newItem = new Item({ title, description, image, category, genre });
    await newItem.save();
    res.status(201).send('Item created');
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).send('Server error');
  }
};

exports.getNewArrivals = async (req, res) => {
  try {
    const newArrivals = await Item.find().sort({ createdAt: -1 }).limit(5);
    res.json(newArrivals);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    res.status(500).send('Server error');
  }
};
