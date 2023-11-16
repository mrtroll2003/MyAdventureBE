const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const router = express.Router();

router.get("/hello", async (req, res) => {
  res.send("Hello");
});

router.post("/sign_up", async (req, res) => {
  let { email, password } = req.body;
  password = bcrypt.hashSync(password, 10);
  try {
    const account = new Account({ email, password });
    await account.save();
    console.log(account);
    res.status(202).send("created ");
  } catch (err) {
    if (err.code === 11000) res.status(409).send("email is already in use");
    else res.status(500).send(err.message);
  }
});

router.post("/sign_in", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Account.findOne({ email });

    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      res.status(401).send("Unauthorized");
      return;
    }

    const payload = { id: user._id };

    const body = { token: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET) };
    res.json(body);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});

module.exports = router;
