const express = require("express");
const router = express.Router();
const { Teacher } = require("../models");

router.get("/", async (req, res) => {
    const studentList = await Teacher.findAll();
    res.json(studentList);
});

router.post("/", async (req, res) => {
    const taecher = req.body;
    await Teacher.create(taecher);
    res.json('success');
    
});

module.exports = router