const express = require("express");
const router = express.Router();
const { Answers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");



router.get("/:questionId", /* validateToken, */ async (req, res) => {
    const questionId = req.params.questionId;
    const answer = await Answers.findAll({where: { questionId: questionId } });
    res.json(answer);
});

router.post("/", /* validateToken, */ async (req, res) => {
    const answer = req.body;
    await Answers.create(answer);
    res.json('success');
});

module.exports = router;
