const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000; // Povolit konfiguraci portu prostřednictvím proměnných prostředí

// Importovat kontrolery
const eventController = require("./controller/transaction");
const userController = require("./controller/user");
const attendanceController = require("./controller/attendance");

// Middleware pro zpracování JSON a URL zakódovaných těl požadavků
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Povolit CORS pro všechny požadavky
app.use(cors());

// Základní endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the Financial Management App!");
});

// Definování cest pro jednotlivé kontrolery
app.use("/transaction", eventController);
app.use("/user", userController);
app.use("/attendance", attendanceController);

// Spuštění serveru
app.listen(port, () => {
    console.log(`Financial Management App listening on port ${port}`);
});

module.exports = app; // Exportovat app pro testování nebo další použití
