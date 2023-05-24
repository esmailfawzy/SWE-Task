const express = require("express")
const router = express.Router()
const { register, login, update } = require("./Auth");
const { adminAuth } = require("../Auth")
router.route("/register").post(register)
router.route("/login").post(login);
router.route("/update").put(adminAuth, update)
module.exports = router





