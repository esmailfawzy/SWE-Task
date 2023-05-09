import express from "express";

const router = express.Router();

router.get("/addDepartment", (req, res) => {
  res.send("Hi from departments");
});

export default router;
