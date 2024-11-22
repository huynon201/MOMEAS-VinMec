const connection = require("../configs/database");
const displayDepartment = async (page, limit) => {
  const offset = (page - 1) * limit; // Tính vị trí bắt đầu

  const [countResult] = await connection.query(
    "SELECT COUNT(*) AS total FROM departments"
  );

  const totalItems = countResult[0].total;

  const [results] = await connection.query(
    "SELECT * FROM departments ORDER BY created_at ASC LIMIT ? OFFSET ?",
    [limit, offset]
  );

  return {
    department: results,
    totalItems,
  };
};

const createDepartment = async (id, name, des, create_at) => {
  let [results, fields] = await connection.query(
    `INSERT INTO departments (id, name, description, created_at) VALUES (?, ?, ?, ?)`,
    [id, name, des, create_at]
  );
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM departments WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
module.exports = {
  displayDepartment,
  createDepartment,
  checkUniqueId,
};
