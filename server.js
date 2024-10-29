const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');
const inventoryRoutes = require('./routes/Inventory');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {console.log('MongoDB Atlas Connected!!')})

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));