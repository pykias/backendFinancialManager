const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Import controllers
const transactionController = require("./controller/transaction");
const userController = require("./controller/user");
const attendanceController = require("./controller/attendance");

app.get("/", (req, res) => {
    res.send("Welcome to the Financial Management App!");
});

app.use("/transaction", transactionController);
app.use("/user", userController);
app.use("/attendance", attendanceController);

app.listen(port, () => {
    console.log(`Financial Management App listening on port ${port}`);
});

module.exports = app;
