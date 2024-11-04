const express = require("express");
const app = express();
const port = 8084;
const hostname = "localhost";
app.get("/", (req, res) => {
  res.send("he");
});
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
