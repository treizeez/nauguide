import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { checkAdmin } from "./routes/checkAdmin.js";
import { signInAdmin } from "./routes/signInAdmin.js";
import mongoose from "mongoose";
import { createAdminRoute } from "./routes/createAdminRoute.js";
import { dataArray } from "./dataArray.js";

const app = express();
app.use(cors());

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

dataArray.map((data) => app.use(`/api/${data[0]}`, createAdminRoute(data[1])));

app.get("/signInAdmin", signInAdmin);

app.post("/checkAdmin", checkAdmin);

app.listen(process.env.PORT || 5000, () => {
  console.log("backend is running");
});
