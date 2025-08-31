import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";

// ...

mongoose.connect(DATABASE_URL).then(() => console.log("Connected to DB"));
