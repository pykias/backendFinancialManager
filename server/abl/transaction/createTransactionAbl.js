const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const transactionDao = require("../../dao/transaction-dao");

const schema = {
  type: "object",
  properties: {
    date: { type: "string", format: "date-time" },
    name: { type: "string", minLength: 3 },
    amount: { type: "number" },
    type: { type: "string", enum: ["income", "expense"] },
    desc: { type: "string", nullable: true, default: "" },
  },
  required: ["date", "name", "amount", "type"],
  additionalProperties: false,
};

async function CreateTransactionAbl(req, res) {
  try {
    let transaction = req.body;

    // validate vstupu
    const valid = ajv.validate(schema, transaction);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Vytvoření finanční události
    const createdTransaction = await transactionDao.create(transaction);
    res.json(createdTransaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateTransactionAbl;
