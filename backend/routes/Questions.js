const express = require("express");
const router = express.Router();
const { Paper, Questions, Teacher, sequelize } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("byId/:questionId", validateToken, async (req, res) => {
    const questionId = req.params.questionId;
    const question = await Questions.findByPk(questionId);
    res.json(question);
});

router.get("/:paperId", validateToken, async (req, res) => {
    const paperId = req.params.paperId;
    const question = await Questions.findAll({ where: { paperId: paperId } });
    res.json(question);
});

/* router.get("/totalnum/:paperId", validateToken, async (req, res) => {
    const paperId = req.params.paperId;
    const questions = await Questions.findAll({ where: { paperId: paperId } });

    const totalQuestions = questions.length;

    res.json({ totalQuestions });
}); */

router.get("/totalnum/:paperId", validateToken, async (req, res) => {
    try {
        const paperId = req.params.paperId;

        const questionCount = await Questions.count({
            where: { paperId: paperId },
        });

        res.json({ totalQuestions: questionCount });
        
    } catch (error) {
        console.error('Error counting questions for paper:', error);
        res.status(500).json({ error: 'An error occurred while counting questions for the paper' });
    }
});




module.exports = router