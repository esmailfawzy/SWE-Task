import express from "express";
import { register, login, update } from "./Auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(update);

export default router;
