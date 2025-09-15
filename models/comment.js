const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "articles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
    tableName: "comments",
  }
);

module.exports = Comment;
