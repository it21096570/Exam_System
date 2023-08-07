const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");

router.get("/", async (req, res) => {
    const userList = await User.findAll();
    res.json(userList);
});

router.post("/", async (req, res) => {
    const {nic, name, role, username, password} = req.body;
    console.log(password)
    bcrypt.hash(password,10).then((hash) => {
        User.create({
            nic: nic,
            name: name,
            role: role,
            username: username,
            password: hash,
        });
    });
    res.json('success')
    
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({where: {username: username}});

    if(!user) res.json({erorr: "User Not Found"});

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({ erorr: "Wrong Username or Password"});

        const accessToken = sign({ username: user.username, nic: user.nic},
            "important"
            );

        res.json(accessToken);
    });
});




module.exports = router