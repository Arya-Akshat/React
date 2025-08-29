// backend/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Mount the routers
app.use('/posts', postRoutes);
// We mount the comment routes at the same base path
// The full path will be handled inside the router file
app.use('/posts', commentRoutes);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

// ---