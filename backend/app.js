import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import contactRoute from './routes/contactRoute.js'

dotenv.config();
const app=express();

app.use(cors({
  origin: 'http://localhost:5173', //my frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use('/api/contact', contactRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message
  });
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MONGODB Connected');
}).catch((err)=>{
    console.log('Error connecting MongoDB:', err.message);
});

const PORT=process.env.PORT||5000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});