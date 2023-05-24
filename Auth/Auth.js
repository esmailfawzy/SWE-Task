import User from "../models/User.js";
import bcrypt from "bcryptjs";

// auth.js
export const register = async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    await User.create({
      username,
      password,
    }).then((user) =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    );
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: err.mesage,
    });
  }
};

// auth.js

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username, password })
//     if (!user) {
//       res.status(401).json({
//         message: "Login not successful",
//         error: "User not found",
//       })
//     } else {
//       res.status(200).json({
//         message: "Login successful",
//         user,
//       })
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: "An error occurred",
//       error: error.message,
//     })
//   }
// }

//auth.js
export const update = async (req, res, next) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    // Verifying if the value of role is admin
    if (role === "admin") {
      await User.findById(id);
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        result
          ? res.status(200).json({
              message: "Login successful",
              user,
            })
          : res.status(400).json({ message: "Login not succesful" });
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
