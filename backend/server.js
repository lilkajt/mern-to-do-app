import express from 'express';
import {connectDB} from './config/db.js';
import ToDoRoutes from './routes/ToDoRoute.js';

const app = express();
app.use(express.json());
app.use('/api/todo', ToDoRoutes);
app.listen(7500, ()=>{
    connectDB();
    console.log("Server started at http://localhost:7500");
});