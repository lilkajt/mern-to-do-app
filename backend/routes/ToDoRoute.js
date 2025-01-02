import express, { Router } from 'express';
import { createToDo, deleteToDo, getToDos, updateToDo } from '../controller/ToDo.controller';

const router = express.Router();

router.get('/', getToDos);
router.get('/', createToDo);
router.get('/:id', updateToDo);
router.get('/:id', deleteToDo);

module.exports = router;