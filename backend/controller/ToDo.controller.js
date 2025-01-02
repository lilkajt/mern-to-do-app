import mongoose from "mongoose";
import ToDo from "../models/ToDo.model.js";

export const getToDos = async (req, res) => {
    const todos = await ToDo.find();
    res.send(todos);
}

export const createToDo = async (req, res) => {
    const body = req.body;

    if ( body.text == ''){
        return res.status(400).send({message: "Text is required"});
    }
    const newToDo = new ToDo(body);
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
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({message: "Invalid id"});
    }

    if ( body.text == ''){
        return res.status(400).send({message: "Text is required"});
    }

    try {
        const updatedToDo = await ToDo.findByIdAndUpdate(id, body, {new: true});
        res.status(200).json({success: true, data: updatedToDo});
    } catch (error) {
        console.log(`Error in update todo: ${error.message}`);
        res.status(500).json({success: false, message: error.message});
    }
}

export const deleteToDo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({message: "Invalid id"});
    }

    try {
        await ToDo.findByIdAndRemove(id);
        res.status(200).json({success: true, message: "ToDo deleted successfully"});
    } catch (error) {
        console.log(`Error in delete todo: ${error.message}`);
        res.status(500).json({success: false, message: error.message});
    }
}