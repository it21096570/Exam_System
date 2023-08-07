const express = require("express");
const router = express.Router();
const { Student } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", async (req, res) => {
    const studentList = await Student.findAll();
    res.json(studentList);
});

router.post("/", validateToken, async (req, res) => {
    const student = req.body;
    await Student.create(student);
    res.json('success');
    
});

module.exports = router