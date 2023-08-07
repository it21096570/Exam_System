const express = require("express");
const router = express.Router();
const { Answers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", async (req, res) => {
    const answerList = await Answers.findAll();
    res.json(answerList);
});

router.post("/", validateToken, async (req, res) => {
    const answer = req.body;
    await Answers.create(answer);
    res.json('success');
});

module.exports = router;
