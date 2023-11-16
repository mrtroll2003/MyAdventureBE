const jwt = require("jsonwebtoken");
const { db } = require("../models/database.js");

async function Authentication(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).send("Forbidden");
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Forbidden");
    return;
  }

  try {
    console.log(process.env.ACCESS_TOKEN_SECRET);
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(payload);
    const id = payload.id;
    if (!id) {
      res.status(403).send("Forbidden");
      return;
    }

    const col = db.collection("accounts");

    const user = await col.findOne({ _id: id});
    console.log(user);

    if (!user) {
      res.status(403).send("Forbidden");
      return;
    }
  } catch (err) {
    if (err.message === "invalid signature") {
      res.status(403).send("Forbidden");
      return;
    } else {
      res.sendStatus(500);
      return;
    }
  }

  next();
}

module.exports = { Authentication };