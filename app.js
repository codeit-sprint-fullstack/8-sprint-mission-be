import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "superstruct";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === "StructError" ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        res.status(404).send({ message: "Cannot find given id" });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// freeboard API
app.get(
  "/freeboard",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 5, order = "newest" } = req.query;
    let orderBy;
    switch (order) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
    }
    const articles = await prisma.article.findMany({
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(articles);
  })
);

app.get(
  "/freeboard/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const articles = await prisma.article.findUniqueOrThrow({
      where: { id },
    });
    res.send(articles);
  })
);

app.post(
  "/freeboard/write",
  asyncHandler(async (req, res) => {
    const articles = await prisma.article.create({
      data: req.body,
    });
    res.status(201).send(articles);
  })
);

app.patch(
  "/freeboard/edit",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.update({
      where: { id },
      data: req.body,
    });
    res.send(article);
  })
);

app.delete(
  "/freeboard/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

// comment API
app.get(
  "/freeboard/:id/comments",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 5, order = "newest" } = req.query;
    let orderBy;
    switch (order) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
    }
    const comments = await prisma.comment.findMany({
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(comments);
  })
);

// app.get(
//   "/comments/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const comments = await prisma.comment.findUniqueOrThrow({
//       where: { id },
//     });
//     res.send(comments);
//   })
// );

app.post(
  "/freeboard/:id/comments",
  asyncHandler(async (req, res) => {
    const comments = await prisma.comment.create({
      data: req.body,
    });
    res.status(201).send(comments);
  })
);

app.patch(
  "/freeboard/:id/comment",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.comment.update({
      where: { id },
      data: req.body,
    });
    res.send(comment);
  })
);

app.delete(
  "/freeboard/:id/comment",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.listen(3000, () => console.log("Server Started"));
