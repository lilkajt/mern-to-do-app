import express, { Router } from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    // res.send("Hello World");
    res.json({message: "Hello World"});
});

module.exports = router;