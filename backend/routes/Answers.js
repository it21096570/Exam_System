const express = require("express");
const router = express.Router();
const { Answers, Teacher, sequelize } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");



router.get("/:questionId", validateToken, async (req, res) => {
    const questionId = req.params.questionId;
    const answer = await Answers.findAll({where: { questionId: questionId } });
    res.json(answer);
});

router.post("/", validateToken, async (req, res) => {
    const answer = req.body;
    await Answers.create(answer);
    res.json('success');
});

router.get("/latestQuestionId", validateToken, async (req, res) => {
    try {
        const teacherNIC = req.user;
        console.log("Teacher NIC:", teacherNIC);
    
        const teacher = await Teacher.findOne({ where: { nic: teacherNIC } });
        if (!teacher) {
            console.log('Teacher not found');
            return res.status(404).json({ error: 'Teacher not found' });
        }
    
        const teacherID = teacher.teacherId;
        console.log("tID:", teacherID);
    
        const query = `
        SELECT MAX(q.questionId) AS latestQuestionId
        FROM questions AS q
        INNER JOIN papers AS p ON q.paperId = p.paperId
        WHERE p.teacherId = :teacherId`;
    
        const [result] = await sequelize.query(query, {
            replacements: { teacherId: teacherID },
            type: sequelize.QueryTypes.SELECT
        });
    
        const latestQuestionId = result.latestQuestionId || null;
        console.log('Latest Question ID:', latestQuestionId);
    
        res.json({ latestQuestionId });
    
    } catch (error) {
        console.error('Error fetching latest Question ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching the latest Question ID' });
    }
    
});



module.exports = router;
