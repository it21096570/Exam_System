const express = require("express");
const router = express.Router();
const { Questions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", /* validateToken, */ async (req, res) => {
    const questionList = await Questions.findAll();
    res.json(questionList);
});

router.post("/", /* validateToken, */ async (req, res) => {
    const question = req.body;
    await Questions.create(question);
    res.json('success');
    
});

module.exports = router