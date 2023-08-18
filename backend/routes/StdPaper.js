const express = require("express");
const router = express.Router();
const { StdPaper, Student } = require("../models"); 

const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken, async (req, res) => {
    const stdPaperList = await StdPaper.findAll();
    res.json(stdPaperList);
});

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

        const stdPaper = req.body;

        stdPaper.studentId = studentId;

       
        await StdPaper.create(stdPaper);

        res.json('success');

        
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ error: 'An error occurred while submitting the answer' });
    }
  
});

module.exports = router;
