const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const transactionDao = require("../../dao/transaction-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    date: { type: "string", format: "date-time" },
    name: { type: "string", minLength: 3 },
    amount: { type: "number" },
    type: { type: "string", enum: ["income", "expense"] },
    category: { type: "string" },
    desc: { type: "string", nullable: true, default: "" },
  },
  required: ["id", "date", "name", "amount", "type", "category"],
  additionalProperties: false,
};

async function UpdateTransactionAbl(req, res) {
  try {
    let transaction = req.body;

    // Validace vstupních dat
    const valid = ajv.validate(schema, transaction);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Aktualizace transakce podle ID
    const updatedTransaction = await transactionDao.update(transaction);
    if (!updatedTransaction) {
      res.status(404).json({
        code: "transactionNotFound",
        message: `Transaction ${transaction.id} not found`,
      });
      return;
    }

    res.json(updatedTransaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateTransactionAbl;
