const express = require("express");
const router = express.Router();
const { Student } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken, async (req, res) => {
    const studentList = await Student.findAll();
    res.json(studentList);
});


router.get("/total", validateToken, async (req, res) => {
    try {
        const studentCount = await Student.count();
        res.json({ count: studentCount });
    } catch (error) {
        console.error('Error counting students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get("/:nic", validateToken, async (req, res) => {
    const nic = req.params.nic;
    const student = await Student.findAll({ where: { nic: nic } });
    res.json(student);
});

router.post("/", async (req, res) => {
    const student = req.body;
    await Student.create(student);
    res.json('success');

});


module.exports = router