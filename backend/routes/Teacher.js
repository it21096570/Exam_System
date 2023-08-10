const express = require("express");
const router = express.Router();
const { Teacher } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/",  /* validateToken */ async (req, res) => {
    const studentList = await Teacher.findAll();
    res.json(studentList);
});

router.post("/", /* validateToken */ async (req, res) => {
    const taecher = req.body;
    await Teacher.create(taecher);
    res.json('success');
    
});

module.exports = router