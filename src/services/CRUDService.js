const connection = require("../configs/database");

const displayCategorary = async (req, res) => {
  let [results, fields] = await connection.query(`SELECT * FROM categories`);
  return results;
};
const createCatrgory = async (id, name, des) => {
  let [results, fields] = await connection.query(
    `INSERT INTO categories(id, name, description)
        VALUES (?, ?, ?)`,
    [id, name, des]
  );
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM categories WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
module.exports = {
  displayCategorary,
  createCatrgory,
  checkUniqueId,
};
