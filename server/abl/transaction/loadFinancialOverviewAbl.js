const transactionDao = require("../../dao/transaction-dao");

async function loadFinancialOverview(req, res) {
    try {
        const transactionList = await transactionDao.list();
        res.json({ transactionList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = loadFinancialOverview;
