import { Router } from "express";
import {
  create,
  deleteOne,
  edit,
  index,
  show,
  store,
  update,
  createForm,
} from "../controllers/user.js";
import { register } from "../Auth/Auth.js";

const userRouter = new Router();

userRouter.get("/", index);
userRouter.route("/create").get(createForm).post(create);
userRouter.post("/", store);
userRouter.get("/:id", show);
userRouter.get("/:id/edit", edit);

userRouter.put("/:id", update);

userRouter.delete("/:id", deleteOne);

export default userRouter;
