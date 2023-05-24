import express from "express";
import mongoose from "mongoose";
import Department from "../models/Department.js";
import {
  addDepartment,
  showDepartments,
  addDepForm,
} from "../controllers/Department.js";
const router = express.Router();

router.route("/addDepartment").get(addDepForm).post(addDepartment);

router.get("/", showDepartments);

export default router;
