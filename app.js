import express from "express";
import mockArticles from "./data/mockArticle.js";
import mockComments from "./data/mockComment.js";

const app = express();
app.use(express.json());

app.get("/mockArticles", (req, res) => {
  /**
   * 쿼리 파라미터
   * - sort: newest인 경우 새로운 게시글 기준, 아닌 경우 best?순
   * - count: 게시글 개수
   */
  const sort = req.query.sort;
  const count = Number(req.query.count);

  const compareFn =
    sort === "newest"
      ? (a, b) => b.createdAt - a.createdAt // 최신순
      : (a, b) => a.createdAt - b.createdAt; // 오래된순

  let newArticles = mockArticles.sort(compareFn);

  if (count) {
    newArticles = newArticles.slice(0, count);
  }

  res.send(newArticles);
});

app.get("/mockArticles/:id", (req, res) => {
  const id = Number(req.params.id);
  const Article = mockArticles.find((Article) => Article.id === id);
  if (Article) {
    res.send(Article);
  } else {
    res.status(404).send({ message: "Cannot find given id" });
  }
});

app.post("/mockArticles", (req, res) => {
  const newArticle = req.body;
  const ids = mockArticles.map((mockArticle) => mockArticle.id);
  newArticle.id = Math.max(...ids) + 1;
  newArticle.createdAt = new Date();
  newArticle.updatedAt = new Date();

  mockArticles.push(newArticle);
  res.status(201).send(newArticle);
});

app.patch("/mockArticles/:id", (req, res) => {
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
});

app.delete("/mockArticles/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = mockArticles.findIndex((Article) => Article.id === id);
  if (idx >= 0) {
    mockArticles.splice(idx, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send({ message: "Cannot find given id" });
  }
});

app.listen(3000, () => console.log("Server Started"));
