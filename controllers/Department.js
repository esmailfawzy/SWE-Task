import Department from "../models/Department.js";

export const addDepartment = async (req, res) => {
  const new_dep = {
    name: req.body.dep_name,
    dep_code: req.body.dep_code,
  };

  const dep = await Department.create(new_dep);

  await dep.save();

  res.status(201).redirect("/departments");
};

export const showDepartments = async (req, res) => {
  const departments = await Department.find().lean();
  res.render("departments/show", { departments });
};

export const addDepForm = async (req, res) => {
  res.render("departments/add");
};
