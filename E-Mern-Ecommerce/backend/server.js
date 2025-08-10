require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port http://localhost:${process.env.PORT}/api/auth/login `);
        });
    })
    .catch(err => console.error(err));
    