import { Schema, model } from "mongoose";

const subject = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: false,
    },
    dep: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Department",
    },
    pre_req: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: false,
      ref: "user",
    },
    pdfPath: String,
  },
  { timestamps: true }
);

export default model("subject", subject);
