const { displayEmployee } = require("../services/CRUDEmployee");
const { displayDepartment } = require("../services/CRUDDepartment");
const { displayProduct } = require("../services/CRUDProduct");
const { generateRandomId } = require("../untils/randomUntils");
const {
  displayExport,
  createExport,
  checkUniqueId,
} = require("../services/CRUDExport");

const getExportPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Số phần tử mỗi trang
  let { ex, totalItems } = await displayExport(page, limit);
  // console.log(ex);
  let employee = await displayEmployee();
  let department = await displayDepartment();
  let product = await displayProduct();
  const totalPages = Math.ceil(totalItems / limit);
  return res.render("warehouseExport.ejs", {
    activePage: "export",
    listEmployee: employee,
    listDepartment: department,
    listProduct: product,
    listExport: ex,
    currentPage: page,
    totalPages,
  });
};
const postCreateExport = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const create_at = new Date();
  const { producttb, quantity, name_export, department, name_employee } =
    req.body;
  console.log(req.body);
  await createExport(
    id,
    producttb,
    quantity,
    name_export,
    department,
    name_employee,
    create_at
  );
  res.redirect("back");
};
module.exports = {
  getExportPage,
  postCreateExport,
};
