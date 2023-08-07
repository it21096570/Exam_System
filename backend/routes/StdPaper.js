const express = require("express");
const router = express.Router();
const { StdPaper } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", async (req, res) => {
    const stdPaperList = await StdPaper.findAll();
    res.json(stdPaperList);
});

router.post("/", validateToken, async (req, res) => {
    const stdPaper = req.body;
    await StdPaper.create(stdPaper);
    res.json('success');
});

module.exports = router;
