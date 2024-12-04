const avatarMiddleware = (req, res, next) => {
  res.locals.avatar = req.cookies.img || "default.jpg"; // Gán giá trị cookie hoặc ảnh mặc định
  next();
};
module.exports = avatarMiddleware;
