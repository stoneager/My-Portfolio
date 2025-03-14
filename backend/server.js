const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON body

// Importing route file
const projectRoutes = require('./routes/projectRoutes');

// Registering route
app.use('/api/projects', projectRoutes);  // 👈 This is crucial!

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

app.post('/test', (req, res) => {
    res.json({ message: 'Test POST route working!' });
});
    

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
