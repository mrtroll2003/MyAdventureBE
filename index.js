const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors"); // Thêm dòng này

const app = express();

app.use(cors()); // Và dòng này

// Phần còn lại của mã server của bạn


const { MongoClient } = require("mongodb");


app.use(express.json());

// Replace the following with your Atlas connection string
const url = "mongodb+srv://21522041:12032003@cluster0.ebrkrjv.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);

// Reference the database to use
const dbName = "MyAdventure";

app.post('/api/login', async (req, res) => {
  try {
    // Connect to the Atlas cluster
    await client.connect();
    const db = client.db(dbName);

    console.log("hello")
    // Reference the "account" collection
    const col = db.collection("account");

    // Get the user input from the login request
    const { email, password } = req.body;

    // Find the user document based on the email and password
    const user = await col.findOne({ email, password });

    if (user) {
      // User found, login successful
      console.log("Login successful");
      res.json({ message: "Login successful" });
    } else {
      // User not found, invalid credentials
      console.log("Invalid credentials");
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  } finally {
    await client.close();
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});