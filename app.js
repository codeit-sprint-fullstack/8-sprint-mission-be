import express from "express";
import { PrismaClient } from "@prisma/client";
import { DATABASE_URL } from "./env.js";
import Article from "./models/Task.js";
import mockComments from "./data/mockComments.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.status(400).send({ message: "Cannot find given id" });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// article API
app.get("/articles", async (req, res) => {
  const articles = await prisma.article.findMany();
  res.send(articles);
});

app.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const articles = await prisma.article.findUnique({
    where: { id },
  });
  res.send(articles);
});

app.post("/articles", async (req, res) => {
  const articles = await prisma.article.create({
    data: req.body,
  });
  res.status(201).send(articles);
});

app.patch("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.send(article);
});

app.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  });
  res.sendStatus(204);
});

app.listen(3000, () => console.log("Server Started"));
