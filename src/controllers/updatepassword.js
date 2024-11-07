// updatePassword.js
const bcrypt = require("bcrypt");
const connection = require("../configs/database");

async function updatePassword() {
  try {
    // Băm mật khẩu mới
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Cập nhật mật khẩu đã mã hóa cho user 'a1'
    await connection.query("UPDATE users SET password = ? WHERE username = ?", [
      hashedPassword,
      "a1",
    ]);
    console.log("Cập nhật mật khẩu thành công cho user 'a1'");
  } catch (error) {
    console.error("Lỗi khi cập nhật mật khẩu:", error);
  } finally {
    // Đóng kết nối cơ sở dữ liệu
    connection.end();
  }
}

updatePassword();
