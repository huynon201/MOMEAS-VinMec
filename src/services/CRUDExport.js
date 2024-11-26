const connection = require("../configs/database");
const displayExport = async (page = null, limit = null) => {
  if (page === null || limit === null) {
    // Lấy toàn bộ danh sách nhân viên
    const [results] = await connection.query(
      `SELECT name FROM exports ORDER BY name`
    );
    return results;
  } else {
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu

    // Đếm tổng số danh mục
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM exports"
    );
    const totalItems = countResult[0].total;

    let [results, fields] = await connection.query(
      `SELECT * FROM exports ORDER BY created_at ASC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return {
      ex: results,
      totalItems,
    };
  }
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM departments WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
// const createExport = async (
//   id,
//   producttb,
//   quantity,
//   name_export,
//   department,
//   name_employee,
//   create_at
// ) => {
//   let [results, fields] = await connection.query(
//     `INSERT INTO exports (id,name, name_department, name_employee, created_at) VALUES (?, ?, ?, ?, ?)`,
//     [id, name_export, department, name_employee, create_at]
//   );
//   //   const exportDetailsValues = producttb.map((product) => [
//   //     name_export,
//   //     product.name,
//   //     product.quantity,
//   //   ]);
//   //   let [results2, fields2] = await connection.query(
//   //     `INSERT INTO exportDetails (name_export, name_product, quantity_product)
//   //     VALUES (?, ?, ?)`,
//   //     [exportDetailsValues]
//   //   );
//   // Insert into 'exportDetails' table
//   // Kiểm tra xem mảng name_producttb và quantity có dữ liệu hay không
//   if (producttb && quantity && producttb.length === quantity.length) {
//     const insertPromises = producttb.map((product, index) => {
//       return connection.query(
//         `INSERT INTO exportDetails (name_export, name_product, quantity_product) VALUES (?, ?, ?)`,
//         [name_export, product, quantity[index]]
//       );
//     });
//     await Promise.all(insertPromises);
//   } else {
//     console.log("Product and quantity arrays do not match.");
//   }
// };
const createExport = async (
  id,
  producttb,
  quantity,
  name_export,
  department,
  name_employee,
  create_at
) => {
  // Insert into 'exports' table
  console.log("Inserting into 'exports' table...");
  let [results, fields] = await connection.query(
    `INSERT INTO exports (id,name, name_department, name_employee, created_at) VALUES (?, ?, ?, ?, ?)`,
    [id, name_export, department, name_employee, create_at]
  );
  console.log("Export inserted:", results);

  // Insert into 'exportDetails' table
  if (producttb && quantity && producttb.length === quantity.length) {
    const insertPromises = producttb.map((product, index) => {
      console.log(
        `Inserting into 'exportDetails' table for product: ${product}, quantity: ${quantity[index]}`
      );
      return connection.query(
        `INSERT INTO exportDetails (name_export, name_product, quantity_product) VALUES (?, ?, ?)`,
        [name_export, product, quantity[index]]
      );
    });

    // Wait for all promises to complete
    await Promise.all(insertPromises);
    console.log("All export details inserted successfully.");
  } else {
    console.log("Product and quantity arrays do not match.");
  }
};

module.exports = {
  displayExport,
  createExport,
  checkUniqueId,
};
