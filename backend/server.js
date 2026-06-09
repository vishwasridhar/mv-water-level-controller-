const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);
const paymentRoutes = require('./routes/payments');
app.use('/api/payments', paymentRoutes);
const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);
const forgotPasswordRoutes = require('./routes/forgotPassword');
app.use('/api/forgot', forgotPasswordRoutes);

app.get('/', (req, res) => {
    res.send('server is running');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('mongodb connected');
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log('Error:', err.message);
})