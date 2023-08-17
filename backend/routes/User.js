const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", async (req, res) => {
    const userList = await User.findAll();
    res.json(userList);
});

router.post("/", async (req, res) => {
    const { nic, name, role, username, password } = req.body;
    console.log(password)
    bcrypt.hash(password, 10).then((hash) => {
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
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            res.json({ error: "User Not Found" });
            return;
        }

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username or Password" });
                return;
            }

            const accessToken = sign({ username: user.username, role: user.role, nic: user.nic }, "important");

            res.json({ accessToken, role: user.role, nic: user.nic });
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/temp",validateToken, async (req, res) => {
    
    //you can access user nic from nic
    

    res.send("OK");
});

module.exports = router








