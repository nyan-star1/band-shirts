const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB:', err);
});

const authRoutes = require('./src/routes/authRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const genreRoutes = require('./src/routes/genreRoutes'); // Import genre routes
const protectedRoutes = require('./src/routes/protectedRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api', genreRoutes); // Use genre routes
app.use('/api', protectedRoutes);

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
