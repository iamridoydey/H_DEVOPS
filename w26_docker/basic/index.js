const express = require("express");
const mongoose = require("mongoose");
const { users } = require("./schema/users");
require("dotenv").config();

// Connect to MongoDB
const dbUrl =
  process.env.DATABASE_URL || "mongodb://localhost:27017/mydatabase";

console.log(`Connecting to MongoDB at ${dbUrl}`);

mongoose.connect(dbUrl).then(() => {
  console.log("Connected to MongoDB");
});

console.log(`name `, process.env.NAME);

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.get("/users", async (_, res) => {
  try {
    const allUsers = await users.find({});
    console.log("users fetched successfully");
    res.send(allUsers);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;
  const user = await users.insertOne({ username, password });
  if (!user) {
    return res.status(400).send({ error: "User already exists" });
  }
  // Here you would typically hash the password and save the user to the database
  res.status(201).send(user);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await users.findOne({ id });
  // Here you would typically fetch the user from the database
  res.send({ message: "User fetched", id });
});

app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
