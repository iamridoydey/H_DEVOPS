import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
const prisma = new PrismaClient();

app.get("/", async(req, res) => {
  const users = await prisma.user.findMany();
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.json({message: "Post endpoint"});
});


app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});