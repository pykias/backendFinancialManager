const transactionDao = require("../../dao/transaction-dao");

async function loadFinancialOverviewAbl(req, res) {
    try {
        const transactions = transactionDao.list();
        const overview = transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === "income") {
                    acc.income += transaction.amount;
                } else if (transaction.type === "expense") {
                    acc.expense += transaction.amount;
                }
                return acc;
            },
            { income: 0, expense: 0 }
        );

        res.json(overview);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = loadFinancialOverviewAbl;
