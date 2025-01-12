import mongoose from "mongoose";
import ToDo from "../models/ToDo.model.js";

export const getToDos = async (req, res) => {
    try {
        const todos = await ToDo.find({});
        res.status(200).json({success: true, data: todos});
    } catch (error) {
        console.log(`Error in get toDos: ${error.message}`)
        res.status(500).json({success: false, message: error.message});
    }
}

export const createToDo = async (req, res) => {
    const toDo = req.body;
    if ( toDo.text == ''){
        return res.status(400).json({success: false, message: "Text is required"});
    }
    const newToDo = new ToDo(toDo);
    try {
        await newToDo.save();
        res.status(201).json({success: true, data: newToDo});
    } catch (error) {
        console.log(`Error in create todo: ${error.message}`);
        res.status(500).json({success: false, message: error.message});
    }
}

export const updateToDo = async (req, res) => {
    const { id } = req.params;
    const toDo = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No todo with this id");
    }

    if ( toDo.text.trim() === ''){
        return res.status(400).send("Text is required");
    }

    try {
        const updatedToDo = await ToDo.findByIdAndUpdate(id, toDo, {new: true});
        res.status(200).json({success: true, data: updatedToDo});
    } catch (error) {
        console.log(`Error in update todo: ${error.message}`);
        res.status(500).json({success: false, message: error.message});
    }
}

export const deleteToDo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No todo with this id");
    }

    try {
        await ToDo.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "ToDo deleted successfully"});
    } catch (error) {
        console.log(`Error in delete todo: ${error.message}`);
        res.status(500).json({success: false, message: error.message});
    }
}