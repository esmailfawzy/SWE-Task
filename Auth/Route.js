import express from "express";
import { register, login, update } from "./Auth.js";

const router = express.Router();

router
  .route("/register")
  .get((req, res) => res.render("auth/register"))
  .post(register);
router
  .route("/login")
  .get((req, res) => res.render("auth/login"))
  .post(login);
router.route("/update").put(update);

export default router;
