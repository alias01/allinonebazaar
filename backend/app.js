const express = require("express");
const app = express();
const port = 3000;
global.__dbpool = require("./db");
const userPath = require("./src/routes/user");

/** COMMON MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add headers in order to perform all operation on API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");

  next();
});

app.use(userPath);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
