import express from "express";
import cors from "cors";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "superstruct";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// freeboard API
app.get(
  "/freeboard",
  asyncHandler(async (req, res) => {
    const { cursor, limit = 5, order = "newest" } = req.query;
    let orderBy;
    switch (order) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
    }

    const freeboards = await prisma.freeboard.findMany({
      orderBy,
      take: parseInt(limit),
      ...(cursor
        ? {
            skip: 1,
            cursor: { id: cursor },
          }
        : {}),
    });

    res.send(freeboards);
  })
);

app.get(
  "/freeboard/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const freeboards = await prisma.freeboard.findUniqueOrThrow({
      where: { id },
    });
    res.send(freeboards);
  })
);

app.post(
  "/freeboard",
  asyncHandler(async (req, res) => {
    const freeboards = await prisma.freeboard.create({
      data: {
        ...req.body,
        isDeleted: false,
      },
    });
    res.status(201).send(freeboards);
  })
);

app.patch(
  "/freeboard/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const freeboard = await prisma.freeboard.update({
      where: { id },
      data: req.body,
    });
    res.send(freeboard);
  })
);

app.delete(
  "/freeboard/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.freeboard.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

// comment API
app.get(
  "/freeboard/:id/comments",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { cursor, limit = 5, order = "newest" } = req.query;
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
      where: { freeboardId: id },
      orderBy,
      take: parseInt(limit),
      ...(cursor
        ? {
            skip: 1,
            cursor: { id: cursor },
          }
        : {}),
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
    const { id } = req.params;
    const comments = await prisma.comment.create({
      data: {
        ...req.body,
        freeboardId: id,
        isDeleted: false,
      },
    });
    res.status(201).send(comments);
  })
);

app.patch(
  "/comments/:id",
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
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

const PORT = 5000;
app.listen(5000, () =>
  console.log(`Server Started: http://localhost:${PORT}/freeboard`)
);
