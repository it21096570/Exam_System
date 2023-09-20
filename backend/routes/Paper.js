const express = require("express");
const router = express.Router();
const { Paper, Teacher, sequelize, Student, Questions, Answers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");




router.get("/", validateToken, async (req, res) => {
    
        const paperList = await Paper.findAll();
        res.json( paperList);
});

router.get("/student", validateToken, async (req, res) => {
    try {
        const studentNIC = req.user;
        console.log("S NIC:", studentNIC);

        const student = await Student.findOne({ where: { nic: studentNIC } });

        if (!student) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const studentId = student.id;
        console.log("student ID:", studentId);

        res.json( studentId );

    } catch (error) {
        console.error('Student ID :', error);
        res.status(500).json({ error: 'An error occurred while Student ID' });
    }
});

router.get("/byId/:paperId", validateToken, async (req, res) => {
    const paperId = req.params.paperId;
    const paper = await Paper.findByPk(paperId);
    res.json(paper);
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




/* router.post("/", validateToken, async (req, res) => {
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

router.post("/questions", validateToken, async (req, res) => {
    const question = req.body;
    await Questions.create(question);
    res.json({ message: 'success', questionId: question.questionId });

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

router.post("/answers", validateToken, async (req, res) => {
    const answer = req.body;
    await Answers.create(answer);
    res.json('success');
});
 */

router.post('/fullExam', validateToken, async (req, res) => {

    const { examData, questionsData } = req.body;

    const teacherNIC = req.user;
    console.log("Teacher NIC:", teacherNIC);

    try {
        // Step 1: Find the teacher by NIC
        const teacher = await Teacher.findOne({ where: { nic: teacherNIC } });

        if (!teacher) {
            console.error('Teacher not found for NIC:', teacherNIC);
            return res.status(400).json({ success: false, error: 'Teacher not found' });
        }

        const teacherId = teacher.teacherId;
        console.log("Teacher ID:", teacherId);

        // Add the teacherId to the examData before creating the Paper
        examData.teacherId = teacherId;

        // Step 2: Add exam details
        const createdPaper = await Paper.create(examData);

        // Check if the response contains a valid paperId
        if (createdPaper.paperId) {
            const paperId = createdPaper.paperId;

            // Step 3: Add questions and answers
            for (const questionData of questionsData) {
                const createdQuestion = await Questions.create({
                    paperId: paperId,
                    questionNo: questionData.questionNo,
                    question: questionData.question,
                });

                const questionId = createdQuestion.questionId;

                // Create an array to store answer data for this question
                const answerDataArray = questionData.answersData.map((answerData) => ({
                    questionId: questionId,
                    answer: answerData.answer,
                    mark: answerData.mark,
                    status: answerData.status,
                }));

                await Answers.bulkCreate(answerDataArray);
            }

            res.json({ success: true, message: 'Exam, questions, and answers added successfully' });
        } else {
            console.error('Invalid or missing paperId in the exam response:', examResponse);
            res.status(400).json({ success: false, error: 'Invalid paperId in the exam response' });
        }
    } catch (error) {
        console.error('Error adding exam, questions, and answers:', error);
        res.status(500).json({ success: false, error: 'An error occurred while processing the batch data' });
    }
});


module.exports = router;

