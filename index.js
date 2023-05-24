import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import departmentsRoutes from "./routes/Departments.js";
import AuthRouter from "./Auth/Route.js";
import subjectRouter from "./routes/subjects.js";

// configurations
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
dotenv.config();

// routes
app.use("/departments", departmentsRoutes);
app.use("/auth", AuthRouter);
app.use("/subjects", subjectRouter);

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
