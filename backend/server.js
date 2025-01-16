import express from 'express';
import {connectDB} from './config/db.js';
import ToDoRoutes from './routes/ToDoRoute.js';
import cors from 'cors';
import path from 'path';

const app = express();
const __dirname = path.resolve();
app.use(cors());
app.use(express.json());
app.use('/api/todos', ToDoRoutes);
if ( process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}
app.listen(7500, ()=>{
    connectDB();
    console.log("Server started at http://localhost:7500");
});