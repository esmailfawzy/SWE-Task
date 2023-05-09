import express from "express";
import mongoose from "mongoose";
import Department from "../models/Department.js";
const router = express.Router();

router.post("/addDepartment", async (req, res) => {
  const new_dep = {
    name: req.body.dep_name,
    dep_code: req.body.dep_code,
  };

  const dep = await Department.create(new_dep);

  await dep.save();

  res.status(201).json({
    msg: "Created department",
  });
});

router.get("/", (req, res) => {
  res.send("hi");
});

export default router;
