const express = require("express");
const router = express.Router();
const { StudentAnswer, Student } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
    try {

        const studentNIC = req.user; // Assuming req.user contains the student's NIC
        console.log(studentNIC);

        const student = await Student.findOne({ where: { nic: studentNIC } });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const studentId = student.id;
        console.log(studentId);

        const studentAnswer = req.body;

        studentAnswer.studentId = studentId;

        await StudentAnswer.create(studentAnswer);

        res.json({ message: 'Answer submitted successfully' });
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ error: 'An error occurred while submitting the answer' });
    }
});

router.get("/:paperId", validateToken, async (req, res) => {
    const studentNIC = req.user; // Assuming req.user contains the student's NIC

    try {
        const student = await Student.findOne({ where: { nic: studentNIC } });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const paperId = req.params.paperId;
        const studentId = student.id;

        const answers = await StudentAnswer.findAll({
            where: { paperId: paperId, studentId: studentId }
        });

        let totalPoints = 0;

        answers.forEach(answer => {
            // Calculate points for each answer based on your specific conditions
            if (answer.answerStatus === 'Correct') {
                totalPoints += answer.points || 0;
            }
        });


        res.json({ id: studentId, totalPoints: totalPoints });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
