const transactionDao = require("../../dao/transaction-dao");

async function ListTransactionAbl(req, res) {
  try {
    console.log("Received request for /transactions/list");

    // Načíst všechny transakce
    const transactionList =  transactionDao.list();

    // Ověřit, zda seznam transakcí není prázdný
    if (!transactionList || transactionList.length === 0) {
      console.log("No transactionList found");
      return res.status(404).json({ message: "No transactionList found" });
    }

    console.log(`Returning ${transactionList.length} transactions`);
    res.json(transactionList);
  } catch (e) {
    console.error("Error in ListTransactionAbl:", e.message);
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListTransactionAbl;
