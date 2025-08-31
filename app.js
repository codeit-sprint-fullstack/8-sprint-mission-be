import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import mockArticles from "./data/mockArticles.js";
import Article from "./models/Task.js";
import mockComments from "./data/mockComments.js";

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

app.get(
  "/mockArticles",
  asyncHandler(async (req, res) => {
    /**
     * 쿼리 파라미터
     * - sort: newest인 경우 새로운 게시글 기준, 아닌 경우 best?순
     * - count: 게시글 개수
     */
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;

    const sortOptions = { createdAt: sort === "newest" ? "asc" : "desc" };
    const newArticles = await Article.find().sort(sortOptions).limit(count);

    res.send(newArticles);
  })
);

app.get(
  "/mockArticles/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const Article = await Article.findById(id);
    if (Article) {
      res.send(Article);
    } else {
      res.status(404).send({ message: "Cannot find given id" });
    }
  })
);

app.post(
  "/mockArticles",
  asyncHandler(async (req, res) => {
    const newArticle = await Article.create(req.body);
    res.status(201).send(newArticle);
  })
);

app.patch(
  "/mockArticles/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const Article = mockArticles.find((Article) => Article.id === id);
    if (Article) {
      Object.keys(req.body).forEach((key) => {
        Article[key] = req.body[key];
      });
    } else {
      res.status(404).send({ message: "Cannot find given id" });
      Article.updatedAt = new Date();
      res.send(Article);
    }
  })
);

app.delete(
  "/mockArticles/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const idx = mockArticles.findIndex((Article) => Article.id === id);
    if (idx >= 0) {
      mockArticles.splice(idx, 1);
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find given id" });
    }
  })
);

app.listen(3000, () => console.log("Server Started"));
