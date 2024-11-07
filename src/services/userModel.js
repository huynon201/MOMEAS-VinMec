const connection = require("../configs/database");
const bcrypt = require("bcrypt");
// login-feature
const findUserByUserName = async (username) => {
  let [results, fields] = await connection.query(
    `SELECT * FROM users WHERE username = ?`,
    [username]
  );
  return results[0];
};
const createUser = async (username, password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await connection.query(
    `INSERT INTO users(username, password) VALUES (?, ?)`,
    [username, hashedPassword]
  );
};
module.exports = {
  findUserByUserName,
  createUser,
};
