import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 30,
      validate: {
        validator: function (title) {
          return title.split(" ").length > 1;
        },
        message: "Title should be at least two words.",
      },
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
