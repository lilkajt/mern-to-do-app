import express from 'express';
import {connectDB} from './config/db.js';
import ToDoRoutes from './routes/ToDoRoute.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', ToDoRoutes);
app.listen(7500, ()=>{
    connectDB();
    console.log("Server started at http://localhost:7500");
});