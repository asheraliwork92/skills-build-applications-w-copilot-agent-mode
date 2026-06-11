import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';
mongoose.connect(MONGO_URI).then(()=>console.log('MongoDB connected')).catch(err=>console.error('MongoDB connection error',err));

app.get('/', (req,res)=>res.json({status:'ok'}));

const port = Number(process.env.PORT) || 8000;
app.listen(port, ()=>console.log(`Server listening on ${port}`));
