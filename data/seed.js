import mongoose from "mongoose";
import mockArticles from "./mockArticles.js";
import Article from "../models/Task.js";
import { DATABASE_URL } from "../env.js";

mongoose.connect(DATABASE_URL);

await Article.deleteMany({});
await Article.insertMany(mockArticles);

mongoose.connection.close();
