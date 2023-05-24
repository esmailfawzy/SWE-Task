// user.js
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    academicnumber: {
      type: String,
      // required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "department",
    },
    student: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "user",
    },
  },

  { timestamps: true }
);

const User = model("user", UserSchema);

export default User;
