const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const transactionDao = require("../../dao/transaction-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetTransactionAbl(req, res) {
  try {
    // Získat ID z dotazu nebo těla
    const reqParams = req.query?.id ? req.query : req.body;

    // Validace vstupních dat
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Načíst transakci podle zadaného ID
    const transaction = await transactionDao.get(reqParams.id);
    if (!transaction) {
      res.status(404).json({
        code: "transactionNotFound",
        message: `Transaction ${reqParams.id} not found`,
      });
      return;
    }

    res.json(transaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetTransactionAbl;
