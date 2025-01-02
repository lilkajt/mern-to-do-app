import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    }
});

const ToDo = mongoose.model("ToDo", ToDoSchema);
export default ToDo;