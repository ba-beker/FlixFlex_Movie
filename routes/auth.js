const express = require("express");
const User = require("../modules/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
const SECRET_KEY = crypto.randomBytes(32).toString("hex");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        msg: "un compte avec le même nom d'utilisateur existe déjà",
      });
    }
    if (password.length < 6)
      return res.status(400).json({ msg: "Votre mot de passe est faible." });
    const hashedPass = await bcryptjs.hash(password, 8);
    // Generate a verification token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "3d" });

    let user = new User({
      username,
      password: hashedPass,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// $ sign in
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
	console.log(username, password);
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "le compte avec ce nom d'utilisateur n'existe pas" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password!" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
