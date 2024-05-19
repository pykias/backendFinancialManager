const transactionDao = require("../../dao/transaction-dao");

async function ListTransactionAbl(req, res) {
  try {
    console.log("Received request for /transaction/list");

    const transactionList = await transactionDao.list();

    if (!transactionList.length) {
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
