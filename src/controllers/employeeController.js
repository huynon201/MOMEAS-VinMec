const {
  displayEmployee,
  displayDepartment,
  checkUniqueId,
  createDepartment,
  deleteEmployee,
  updateEmployee,
} = require("../services/CRUDEmployee");
const { generateRandomId } = require("../untils/randomUntils");
var moment = require("moment");

const getemployeePage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Số phần tử mỗi trang
  let { employee, totalItems } = await displayEmployee(page, limit);
  const totalPages = Math.ceil(totalItems / limit);
  let department = await displayDepartment();
  return res.render("employee.ejs", {
    activePage: "employee",
    listEmployee: employee,
    listDepartment: department,
    currentPage: page,
    totalPages,
  });
};

const postCreateEmployee = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const at = new Date();
  const create_at = moment(at).format("YYYY-MM-DD HH:mm:ss");
  const { name, department, regency, phoneNumber, address } = req.body;
  await createDepartment(
    id,
    name,
    department,
    regency,
    phoneNumber,
    address,
    create_at
  );
  console.log(create_at);
  res.redirect("back");
};
const postDeleteEmployee = async (req, res) => {
  const id = req.body.id;
  await deleteEmployee(id);
  res.redirect("back");
};
const postUpdateEmployee = async (req, res) => {
  const { editemployeeId, name, department, regency, phoneNumber, address } =
    req.body;
  await updateEmployee(
    editemployeeId,
    name,
    department,
    regency,
    phoneNumber,
    address
  );
  res.redirect("back");
};
module.exports = {
  getemployeePage,
  postCreateEmployee,
  postDeleteEmployee,
  postUpdateEmployee,
};
