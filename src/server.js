require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./configs/database");
const router = require("./routes/web");
const configViewEngine = require("./configs/viewEngine");
const { route } = require("./routes/web");
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

configViewEngine(app);

app.use("/", router);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
