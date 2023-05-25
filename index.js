import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { engine } from "express-handlebars";
import departmentsRoutes from "./routes/Departments.js";
import AuthRouter from "./Auth/Route.js";
import subjectRouter from "./routes/subjects.js";
import userRouter from "./routes/users.js";
import subject from "./models/subject.js";
import { fileURLToPath } from "url";

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
dotenv.config();
app.use("/assets", express.static(path.join(__dirname, "public/uploads")));

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: function (req, file, cb) {
    console.log("filename", file.originalname);
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

// upload files
app.post("/subjects/upload", upload.single("pdfPath"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };

  const { id } = req.params;

  await subject.findByIdAndUpdate(id, {
    $set: { pdfPath: fileData?.path },
  });

  res.redirect("/subjects");
});

// routes
app.get("/homeAdmin", async (req, res) => {
  const subjects = await subject.find().lean();
  res.render("homeAdmin", { subjects });
});
app.get("/homeDoc", async (req, res) => {
  const subjects = await subject.find().lean();
  res.render("homeDoc", { subjects });
});

app.use("/departments", departmentsRoutes);
app.use("/auth", AuthRouter);
app.use("/subjects", subjectRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.redirect("/homeAdmin");
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
