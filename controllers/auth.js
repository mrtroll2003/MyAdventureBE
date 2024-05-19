const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const router = express.Router();

router.get("/", async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});

router.post("/sign_up", async (req, res) => {
  let { email, password } = req.body;
  const isAdmin = false;
  password = bcrypt.hashSync(password, 10);
  const account = await Account.findOne({email});
  if (account) {
    return res.status(409).json({ error: "email is already in use" });
  }
  try {
    const account = new Account({ email, password, isAdmin });
    await account.save();
    console.log(account);
    res.status(202).send("created");
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

    const body = { token: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET), isAdmin: user.isAdmin, email: user.email };
    res.json(body);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});

router.post("/forgot_password", async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(email, password);
    password = bcrypt.hashSync(password, 10);

    const user = await Account.findOne({ email });

    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }

    const updated = await Account.updateOne({email}, {password})

    res.status(200).json({message: "Change Password Successfully"});
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});


module.exports = router;
