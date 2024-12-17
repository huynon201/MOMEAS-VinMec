// const avatarMiddleware = (req, res, next) => {
//   const information = req.cookies.information
//     ? JSON.parse(req.cookies.information)
//     : null;

//   res.locals.avatar = information?.image || "default.jpg"; // Gán giá trị cookie hoặc ảnh mặc định
//   res.locals.name = information?.name_employee || "Khách";
//   res.locals.role = information?.role || "khách";
//   next();
// };
// module.exports = avatarMiddleware;

const avatarMiddleware = (req, res, next) => {
  try {
    // Kiểm tra req.cookies.information và parse JSON an toàn
    const information = req.cookies.information
      ? JSON.parse(req.cookies.information)
      : null;

    res.locals.avatar = information?.image || "default.jpg"; // Gán giá trị cookie hoặc ảnh mặc định
    res.locals.name = information?.name_employee || "Khách";
    res.locals.role = information?.role || "khách";
  } catch (error) {
    // Bắt lỗi JSON.parse nếu không hợp lệ
    console.error("Lỗi parse JSON từ cookie:", error.message);
    res.locals.avatar = "default.jpg";
    res.locals.name = "Khách";
    res.locals.role = "khách";
  }
  next();
};

module.exports = avatarMiddleware;
