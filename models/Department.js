import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dep_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
