const express = require("express");
const router = express.Router();
const transactionDao = require("../dao/transaction-dao");

router.get("/", async (req, res) => {
    try {
        const transactions = await transactionDao.list();
        const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        const overview = {
            totalTransactions: transactions.length,
            totalAmount
        };
        res.json(overview);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
