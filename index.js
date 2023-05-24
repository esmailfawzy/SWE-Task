import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import departmentsRoutes from "./routes/Departments.js";

// configurations

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
dotenv.config();

// routes

app.use("/departments", departmentsRoutes);
app.use("/api/auth", require("./Auth/Route"))


app.get("/", (req, res) => {
  
  res.send("HELLO WORLD!");
});

// connection to database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Done connecting to db");
    app.listen(process.env.PORT, () => {
      console.log(`app listening on ${process.env.PORT}`);
    });
  });
