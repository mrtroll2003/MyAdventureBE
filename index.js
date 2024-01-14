const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./controllers/auth.js");
const tourRouter = require("./controllers/tour.js");
const imageRouter = require("./controllers/image.js");
const ratingRouter = require("./controllers/rating.js");
const bookingRouter = require("./controllers/booking.js");
const adultRouter = require("./controllers/adult.js");
const childrenRouter = require("./controllers/children.js");
const bankingAccountRouter = require("./controllers/bankingAccount.js");
var bodyParser = require("body-parser");
const { Authentication } = require("./middlewares/authentication.js");
const { Authorization } = require("./middlewares/authorization.js");
const Booking = require("./models/booking.js");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use("/auth", authRouter);
app.use("/tour", tourRouter);
app.use("/image", imageRouter);
app.use("/rating", ratingRouter);
app.use("/booking", bookingRouter);
app.use("/adult", adultRouter);
app.use("/children", childrenRouter);
app.use("/banking-account", bankingAccountRouter);

app.get("/admin", Authentication, Authorization("admin"), async (req, res) => {
  res.send("admin");
});

app.get("/user", Authentication, Authorization("user"), async (req, res) => {
  res.send("user");
});

require("dotenv").config();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
  await mongoose.connect(
    "mongodb+srv://21522041:12032003@cluster0.cxvcnmf.mongodb.net/MyAdventure?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

// module.exports.supabase = supabase;
module.exports = app;
