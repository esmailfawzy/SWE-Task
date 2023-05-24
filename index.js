import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import departmentsRoutes from "./routes/Departments.js";
import { adminAuth, userAuth } from "./Auth/Auth.js";



// configurations
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("view engine", "ejs")
app.set("views", "./views");
dotenv.config();



app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));



//render ejs
app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))

// routes
app.use("/departments", departmentsRoutes);
app.use("auth", require("./Auth/Route.js"))
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

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
