const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();


// Routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/courts', require('./routes/courts'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/coaches', require('./routes/coaches'));
app.use('/api/pricing-rules', require('./routes/pricing'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/price', require('./routes/price')); // NEW: price preview

app.get('/', (req, res) => res.send('Court Booking API is running'));

// Simple error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
