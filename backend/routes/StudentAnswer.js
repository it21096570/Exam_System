const express = require("express");
const router = express.Router();
const { StudentAnswer, Student } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/", validateToken, async (req, res) => {
    try {
      const { paperId, questionId, answerId, points, status } = req.body;
      const studentNIC = req.user; // Assuming req.user contains the student's NIC
  
      // Retrieve the student's ID based on NIC
      const student = await Student.findOne({ where: { nic: studentNIC } });
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Check if a record with the same questionId exists for the student
      let studentAnswer = await StudentAnswer.findOne({
        where: { studentId: student.id, questionId: questionId },
      });
  
      if (studentAnswer) {
        // If the record exists, update it
        studentAnswer = await studentAnswer.update({
          answerId: answerId,
          points: points,
          answerStatus: status,
        });
  
        res.json({ message: 'Answer updated successfully', studentAnswer });
        
      } else {
        // If the record doesn't exist, create a new one
        studentAnswer = await StudentAnswer.create({
          studentId: student.id,
          paperId: paperId,
          questionId: questionId,
          answerId: answerId,
          points: points,
          answerStatus: status,
        });
  
        res.json({ message: 'Answer submitted successfully', studentAnswer });
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      res.status(500).json({ error: 'An error occurred while submitting/updating the answer' });
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
        let answerStatus

        answers.forEach(answer => {
            // Calculate points for each answer based on your specific conditions
            if (answer.answerStatus === 'Correct') {
                totalPoints += answer.points || 0;
            }
        });

        res.json({ totalPoints: totalPoints, answerStatus: answerStatus });

        console.log(totalPoints)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.get("/byPaperId/:paperId", validateToken, async (req, res) => {
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

        res.json(answers);



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.put("/", validateToken, async (req, res) => {
    try {
      const { paperId, questionId, answerId, points, answerStatus } = req.body;
      const studentNIC = req.user; // Assuming req.user contains the student's NIC
  
      // Retrieve the student's ID based on NIC
      const student = await Student.findOne({ where: { nic: studentNIC } });
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Create a new StudentAnswer record associated with the student
      const studentAnswer = await StudentAnswer.create({
        studentId: student.id,
        paperId: paperId,
        questionId: questionId,
        answerId: answerId,
        points: points,
        answerStatus: answerStatus,
      });
  
      res.json({ message: 'Answer submitted successfully', studentAnswer });
    } catch (error) {
      console.error('Error submitting answer:', error);
      res.status(500).json({ error: 'An error occurred while submitting the answer' });
    }
  });


module.exports = router;
