const { displayEmployee } = require("../services/CRUDEmployee");
const {
  displayAccount,
  checkUniqueId,
  createAccount,
  displayRole,
  deleteAccount,
  updateAccount,
} = require("../services/CRUDAcount");
const updatePassword = require("./updatepassword");
const { generateRandomId } = require("../untils/randomUntils");
const getAccountPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Số phần tử mỗi trang
  let { account, totalItems } = await displayAccount(page, limit);
  const totalPages = Math.ceil(totalItems / limit);
  let employee = await displayEmployee();
  let role = await displayRole();
  return res.render("account.ejs", {
    activePage: "account",
    listEmployee: employee,
    listAccount: account,
    listRole: role,
    currentPage: page,
    totalPages,
  });
};
const postCreateAccount = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const create_at = new Date();
  const { name_employee, name_account, pwd, role } = req.body;

  const password = await updatePassword(pwd);

  await createAccount(
    id,
    name_employee,
    name_account,
    password,
    role,
    create_at
  );
  res.redirect("back");
};
const postDeleteAccount = async (req, res) => {
  const id = req.body.id;
  await deleteAccount(id);
  res.redirect("back");
};
const postUpdateAccount = async (req, res) => {
  const { editAccountId, name_employee, name_account, pwd, role } = req.body;
  await updateAccount(editAccountId, name_employee, name_account, pwd, role);
  res.redirect("back");
};
module.exports = {
  getAccountPage,
  postCreateAccount,
  postDeleteAccount,
  postUpdateAccount,
};
