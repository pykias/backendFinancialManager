const transactionDao = require("../../dao/transaction-dao.js");

async function ListTransactionAbl(req, res) {
  try {
    // Načíst všechny transakce
    const transactionList = await transactionDao.list();

    res.json(transactionList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListTransactionAbl;
