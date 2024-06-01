const Ajv = require("ajv");
const ajv = new Ajv();

const transactionDao = require("../../dao/transaction-dao.js");

// Schéma pro ověření ID transakce
const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteTransactionAbl(req, res) {
  try {
    // Získání ID transakce z těla požadavku
    const { id } = req.body;

    // Ověření vstupu
    const valid = ajv.validate(schema, { id });
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input is not valid",
        validationError: ajv.errors,
      });
    }

    // Kontrola, zda transakce existuje
    const transaction = transactionDao.get(id);
    if (!transaction) {
      return res.status(404).json({
        code: "transactionNotFound",
        message: `Transaction with id ${id} not found`,
      });
    }

    // Odstranění transakce
    await transactionDao.remove(id);
    res.json({ message: "Transaction successfully deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteTransactionAbl;
