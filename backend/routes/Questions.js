const express = require("express");
const router = express.Router();
const { Questions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("byId/:questionId", /* validateToken, */ async (req, res) => {
    const questionId = req.params.questionId;
    const question = await Questions.findByPk(questionId);
    res.json(question);
});

router.get("/:paperId", /* validateToken, */ async (req, res) => {
    const paperId = req.params.paperId;
    const question = await Questions.findAll({where: { paperId: paperId } });
    res.json(question);
});

router.post("/", /* validateToken, */ async (req, res) => {
    const question = req.body;
    await Questions.create(question);
    res.json('success');
    
});

module.exports = router