const express = require("express");
const router = express.Router();
const { Student } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken, async (req, res) => {
    const studentList = await Student.findAll();
    res.json(studentList);
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