const express = require("express");
const router = express.Router();
const { Paper } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken, async (req, res) => {
    const paperList = await Paper.findAll();
    res.json(paperList);
});

router.get("/byId/:paperId", validateToken, async (req, res) => {
    const paperId = req.params.paperId;
    const paper = await Paper.findByPk(paperId);
    res.json(paper);
});


router.post("/", validateToken, async (req, res) => {
    const paper = req.body;
    await Paper.create(paper);
    res.json('success');
    
});

module.exports = router