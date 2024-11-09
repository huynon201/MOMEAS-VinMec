const connection = require("../configs/database");
const displayProduct = async () => {
  let [results, fields] = await connection.query(`SELECT * FROM products`);
  return results;
};
const createProducts = async (
  name,
  des,
  quantity,
  brand,
  color,
  size,
  image,
  category
) => {
  let [result, fields] = await connection.query(
    `INSERT INTO products (name, description, quantity, brand, color, size , category_name, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, des, quantity, brand, color, size, image, category]
  );
};
module.exports = {
  createProducts,
  displayProduct,
};
