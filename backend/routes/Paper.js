const express = require("express");
const router = express.Router();
const { Paper, Teacher } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken, async (req, res) => {
    const paperList = await Paper.findAll();
    res.json(paperList);
});

router.get("/byId/:paperId", validateToken, async (req, res) => {
    const paperId = req.params.paperId;
    const paper = await Paper.findByPk(paperId);
    res.json(paper);
});



router.post("/", validateToken, async (req, res) => {
    try {
        const teacherNIC = req.user; 
        console.log("Teacher NIC:", teacherNIC);

        const teacher = await Teacher.findOne({ where: { nic: teacherNIC } });

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const teacherId = teacher.teacherId;
        console.log("Teacher ID:", teacherId);

        const teacherPaper = req.body;

        teacherPaper.teacherId = teacherId;

        const createdPaper = await Paper.create(teacherPaper);

        console.log("Paper created:", createdPaper);

        res.json({ message: 'Paper submitted successfully', paper: createdPaper });
    } catch (error) {
        console.error('Error submitting Paper:', error);
        res.status(500).json({ error: 'An error occurred while submitting the Paper' });
    }
});

module.exports = router