const connection = require("../configs/database");
const displayEmployee = async (page, limit) => {
  const offset = (page - 1) * limit; // Tính vị trí bắt đầu

  // Đếm tổng số danh mục
  const [countResult] = await connection.query(
    "SELECT COUNT(*) AS total FROM employees"
  );
  const totalItems = countResult[0].total;
  let [results, fields] = await connection.query(
    `SELECT * FROM employees ORDER BY created_at ASC LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return {
    employee: results,
    totalItems,
  };
};
const displayDepartment = async (req, res) => {
  let [result, fields] = await connection.query(`SELECT name FROM departments`);
  return result;
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM departments WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
const createDepartment = async (
  id,
  name,
  department,
  regency,
  phoneNumber,
  address,
  create_at
) => {
  let results = await connection.query(
    `INSERT INTO employees (id, name_employee, name_department, role, phone, address, created_at) VALUES (?, ? ,?, ?,?,?, ?)`,
    [id, name, department, regency, phoneNumber, address, create_at]
  );
};
const deleteEmployee = async (id) => {
  let results = await connection.query(`DELETE FROM employees WHERE id = ?`, [
    id,
  ]);
};
const updateEmployee = async (
  editemployeeId,
  nameEdit,
  modalEditE,
  regencyEdit,
  phoneNumberEdit,
  addressEdit
) => {
  let results = await connection.query(
    `UPDATE employees SET name_employee = ?, name_department =?, role = ?, phone= ?, address=? WHERE id = ?`,
    [
      nameEdit,
      modalEditE,
      regencyEdit,
      phoneNumberEdit,
      addressEdit,
      editemployeeId,
    ]
  );
};
module.exports = {
  displayEmployee,
  displayDepartment,
  checkUniqueId,
  createDepartment,
  deleteEmployee,
  updateEmployee,
};
