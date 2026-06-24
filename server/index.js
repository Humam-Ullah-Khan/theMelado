require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const menuRoutes = require('./routes/menu');
const adminRoutes = require('./routes/admin');
const cityRoutes = require('./routes/cities');
const uploadRoutes = require('./routes/upload');
const videoRoutes = require('./routes/videos');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/melado')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/menu', menuRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/videos', videoRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'Melado by Guluna' });
});

app.listen(PORT, () => {
  console.log(`Melado server running on port ${PORT}`);
});
