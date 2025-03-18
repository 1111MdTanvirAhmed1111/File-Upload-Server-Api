const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileRoutes = require('./routes/fileRoutes');
const apiKeyAuth = require('./middlewares/apiKeyAuth');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'));

// Serve Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/files', apiKeyAuth, fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
