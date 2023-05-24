import { express } from "express"
import { adminAuth } from ("../Auth/Auth.js")
const router = express.Router()
const { register, login, update } = require("./Auth");
router.route("/register").post(register)
router.route("/login").post(login);
router.route("/update").put(adminAuth, update)
module.exports = router





