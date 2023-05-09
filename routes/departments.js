import express from "express";
import mongoose from "mongoose";
import Department from "../models/Department.js";
import { addDepartment } from "../controllers/Department.js";
const router = express.Router();

router.post("/addDepartment", addDepartment);

router.get("/", (req, res) => {
  res.send("hi");
});

export default router;
