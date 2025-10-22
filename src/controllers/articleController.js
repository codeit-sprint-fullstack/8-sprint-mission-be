export const getArticles = async (req, res) => {
  const { order = "newest", cursor, limit = 5 } = req.query;
  const orderBy =
    order === "oldest" ? { createdAt: "asc" } : { createdAt: "desc" };

  const articles = await prisma.article.findMany({
    orderBy,
    take: parseInt(limit),
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    include: { user: true, likes: true, comments: true },
  });

  res.json(articles);
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      user: true,
      comments: true,
      likes: true,
    },
  });
  if (!article) return res.status(404).json({ message: "Article not found" });
  res.json(article);
};

export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  const article = await prisma.article.create({
    data: {
      title,
      content,
      userId,
      isDeleted: false,
    },
  });
  res.status(201).json(article);
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const article = await prisma.article.update({
    where: { id },
    data: { title, content },
  });
  res.json(article);
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({ where: { id } });
  res.sendStatus(204);
};

export const likeArticle = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  await prisma.$transaction([
    prisma.articleLike.create({
      data: { articleId: id, userId },
    }),
    prisma.article.update({
      where: { id },
      data: { likeCount: { increment: 1 } },
    }),
  ]);
  res.status(201).json({ message: "Liked" });
};

export const unlikeArticle = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  await prisma.$transaction([
    prisma.articleLike.deleteMany({
      where: { articleId: id, userId },
    }),
    prisma.article.update({
      where: { id },
      data: { likeCount: { decrement: 1 } },
    }),
  ]);
  res.json({ message: "Unliked" });
};
