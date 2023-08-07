const express = require("express");
const router = express.Router();
const { StudentAnswer } = require("../models");

router.get("/", async (req, res) => {
    const studentAnswerList = await StudentAnswer.findAll();
    res.json(studentAnswerList);
});

router.post("/", async (req, res) => {
    const studentAnswer = req.body;
    await StudentAnswer.create(studentAnswer);
    res.json('success');
});

module.exports = router;
