import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const DB_URL = process.env.DB_URL;
const PORT = 5000 || process.env.PORT;

mongoose
  .connect(DB_URL, {})
  .then(
    app.listen(PORT, () =>
      console.info(`Server is allready listening for port ${PORT}.... `)
    )
  )
  .catch((e) => console.error(e));
