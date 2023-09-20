const express = require("express");
const router = express.Router();
const { Answers, Teacher, sequelize } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");



router.get("/:questionId", validateToken, async (req, res) => {
    const questionId = req.params.questionId;
    const answer = await Answers.findAll({where: { questionId: questionId } });
    res.json(answer);
});







module.exports = router;
