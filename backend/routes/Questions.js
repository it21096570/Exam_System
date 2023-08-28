const express = require("express");
const router = express.Router();
const { Questions, Teacher } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("byId/:questionId", validateToken, async (req, res) => {
    const questionId = req.params.questionId;
    const question = await Questions.findByPk(questionId);
    res.json(question);
});

router.get("/:paperId", validateToken, async (req, res) => {
    const paperId = req.params.paperId;
    const question = await Questions.findAll({where: { paperId: paperId } });
    res.json(question);
});

router.post("/", validateToken, async (req, res) => {
    const question = req.body;
    await Questions.create(question);
    res.json('success');
    
});

router.get("/latestQusetionId", validateToken, async (req, res) => {
    try {

        const teacherNIC = req.user;
        console.log("Teacher NIC:", teacherNIC);

        const teacher = await Teacher.findOne({ where: { nic: teacherNIC } });

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const teacherID = teacher.teacherId;

        console.log("Teacher ID:", teacherID);


        const query = `
        SELECT MAX(questionId) AS latestQusetionId
        FROM questions
        WHERE teacherId = :teacherId
      `;

        const [result] = await sequelize.query(query, {
            replacements: { teacherId: teacherID },
            type: sequelize.QueryTypes.SELECT
        });

        if (!result || !result.latestQusetionId) {
            return res.status(404).json({ error: 'No paper found' });
        }

        const latestQusetionId = result.latestQusetionId;


        console.log("Latest QI", latestQusetionId);

        res.json({ latestQusetionId });

    } catch (error) {
        console.error('Error fetching latest Question ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching the latest Question ID' });
    }
});

module.exports = router