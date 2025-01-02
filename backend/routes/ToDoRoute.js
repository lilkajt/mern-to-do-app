import express, { Router } from 'express';
import { createToDo, deleteToDo, getToDos, updateToDo } from '../controller/ToDo.controller.js';

const router = express.Router();

router.get('/', getToDos);
router.post('/', createToDo);
router.put('/:id', updateToDo);
router.delete('/:id', deleteToDo);

export default router;