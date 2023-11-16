const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./controllers/auth.js");
const tourRouter = require("./controllers/tour.js");
const imageRouter = require("./controllers/image.js");
var bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))



app.use(cors());
app.use("/auth", authRouter);
app.use("/tour", tourRouter);
app.use("/image", imageRouter);
require('dotenv').config()

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
  await mongoose.connect("mongodb+srv://21522041:12032003@cluster0.cxvcnmf.mongodb.net/MyAdventure?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
