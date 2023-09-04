const express = require("express");
const router = express.Router();
const { Paper, Teacher, sequelize } = require("../models");
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

        res.json({ message: 'Paper submitted successfully', paperId: createdPaper.paperId });

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


router.get("/latestPaperId",  validateToken, async (req, res) => {

    
    try {

        const teacherNIC = req.user;
        console.log("Teacher NIC:", teacherNIC);

        const teacher = await Teacher.findOne({ where: { nic: teacherNIC } });

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const teacherID = teacher.teacherId;


        const query = `
        SELECT MAX(paperId) AS latestPaperId
        FROM papers
        WHERE teacherId = :teacherId
      `;

        const [result] = await sequelize.query(query, {
            replacements: { teacherId: teacherID },
            type: sequelize.QueryTypes.SELECT
        });

        if (!result || !result.latestPaperId) {
            return res.status(404).json({ error: 'No paper found' });
        }

        const latestPaperId = result.latestPaperId;


        res.json({ latestPaperId });

    } catch (error) {
        console.error('Error fetching latest Paper ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching the latest Paper ID' });
    }
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

