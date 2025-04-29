import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();
const app = express();
const prisma = new PrismaClient();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get a single user by ID
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Insert a new user
app.post("/user", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { username, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});


app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});