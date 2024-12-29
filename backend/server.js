import express from 'express';
import {connectDB} from './config/db.js';

const app = express();
app.listen(7500, ()=>{
    connectDB();
    console.log("Server started at http://localhost:7500");
});