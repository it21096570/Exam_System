const express = require("express");
const router = express.Router();
const { StudentAnswer, Student } = require("../models"); // Make sure the paths are correct
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

module.exports = router;
