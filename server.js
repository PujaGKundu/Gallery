const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config({ path: "./src/backend/config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(require("./src/backend/routes/record"));
// get driver connection
const dbo = require("./src/backend/db/conn");

app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
