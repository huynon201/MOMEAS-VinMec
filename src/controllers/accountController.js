const { displayEmployee } = require("../services/CRUDEmployee");
const {
  displayAccount,
  checkUniqueId,
  createAccount,
  displayRole,
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
  console.log(role);
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
module.exports = {
  getAccountPage,
  postCreateAccount,
};
