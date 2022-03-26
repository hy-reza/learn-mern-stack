import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/posts", postRoutes); 

const DB_URL = process.env.DB_URL;
const PORT = 5000 || process.env.PORT;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.info(`Server is allready listening for port ${PORT}.... `)
    )
  )
  .catch((error) => console.error(error));

