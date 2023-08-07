const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    const userList = await User.findAll();
    res.json(userList);
});

router.post("/", async (req, res) => {
    const {nic, name, role, username, password} = req.body;
    console.log(password)
    const hashPassword = await bcrypt.hash(password,10); // hash password
    console.log(hashPassword)

    await User.create({nic, name, role, username, password:hashPassword});
    res.json('success')
    
});




module.exports = router