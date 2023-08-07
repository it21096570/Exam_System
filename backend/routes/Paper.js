const express = require("express");
const router = express.Router();
const { Paper } = require("../models");

router.get("/", async (req, res) => {
    const paperList = await Paper.findAll();
    res.json(paperList);
});

router.post("/", async (req, res) => {
    const paper = req.body;
    await Paper.create(paper);
    res.json('success');
    
});

module.exports = router