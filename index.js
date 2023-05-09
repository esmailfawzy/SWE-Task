import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import departmentsRoutes from "./routes/departments.js";

const app = express();
dotenv.config();
app.use("view engine", "handlebars");
app.set("views", "./views");

app.use("/departments", departmentsRoutes);

app.get("/", (req, res) => {
  res.send("hi");
});

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Done connecting to db");
  app.listen(process.env.PORT, () => {
    console.log(`app listening on ${process.env.PORT}`);
  });
});
