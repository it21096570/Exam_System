// Import necessary modules and models
const express = require("express");
const router = express.Router();
const { StudentAnswer } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Create a new student answer
router.post("/", validateToken,  async (req, res) => {
    try {
        const studentAnswer = req.body;
        await StudentAnswer.create(studentAnswer);
      
        let user = req.user;
        console.log(user);
        res.json({ message: 'Answer submitted successfully' });

    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ error: 'An error occurred while submitting the answer' });
    }
});

module.exports = router;

