import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
