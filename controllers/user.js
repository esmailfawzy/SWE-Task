import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwtSecret =
  "f52560967c6259acfdb699422038fc983af277f0bb208c7fc389ea913674836a4b1d91";

export const index = async (req, res) => {
  const Users = await User.find({}, { name: 1 }).lean();

  res.render("Users/index", { Users });
};

export const createForm = async (req, res) => {
  res.render("createUser");
};
export const create = async (req, res) => {
  const { username, password, email } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      password: hash,
      email,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).redirect("/");
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};
export const edit = async (req, res) => {
  const { id } = req.params;
  const editFormUser = await User.findById(id).lean();
  res.render("Users/edit", { User: editFormUser });
};

export const update = async (req, res) => {
  const { name, code, dep, pre_req } = req.body;

  const { id } = req.params;

  await User.findByIdAndUpdate(id, { $set: { name, code, dep, pre_req } });

  res.redirect("/Users");
};

export const store = async (req, res) => {
  const { name, code, dep, pre_req } = req.body;

  await User.create({
    name,
    code,
    dep,
    pre_req,
  });

  res.redirect("/Users");
};

export const show = async (req, res) => {
  const { id } = req.params;
  const singleUser = await User.findById(id).lean();
  res.render("Users/show", { User: singleUser });
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);
  return res.redirect("/Users");
};
