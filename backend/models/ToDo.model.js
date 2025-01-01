import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    }
});

const ToDo = mongoose.model("ToDo", ToDoSchema);
export default ToDo;