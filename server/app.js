const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

// Import controllers
const transactionController = require("./controller/transaction");
const userController = require("./controller/user");  // Ensure this is correctly imported
const attendanceController = require("./controller/attendance");

// Middleware for processing JSON and URL encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all requests
app.use(cors());

// Basic endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the Financial Management App!");
});

// Define routes for individual controllers
app.use("/transaction", transactionController);
app.use("/users", userController);  // Ensure this matches the path used in the frontend
app.use("/attendance", attendanceController);

// Start the server
app.listen(port, () => {
    console.log(`Financial Management App listening on port ${port}`);
});

module.exports = app;
