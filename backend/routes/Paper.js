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

router.put("/:paperId", validateToken, async (req, res) => {
    try {
        const paperId = req.params.paperId;
        const teacherNIC = req.user;

        const teacher = await Teacher.findOne({ where: { nic: teacherNIC } });

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const paperToUpdate = await Paper.findByPk(paperId);

        if (!paperToUpdate) {
            return res.status(404).json({ error: 'Paper not found' });
        }

        if (paperToUpdate.teacherId !== teacher.teacherId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const updatedPaper = await paperToUpdate.update(req.body);

        console.log("Paper updated:", updatedPaper);

        res.json({ message: 'Paper updated successfully', paper: updatedPaper });
    } catch (error) {
        console.error('Error updating Paper:', error);
        res.status(500).json({ error: 'An error occurred while updating the Paper' });
    }
});

module.exports = router