const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const transactionDao = require("../../dao/transaction-dao")

const schema = {
  type: "object",
  properties: {
    date: { type: "string", format: "date-time" },
    name: { type: "string", minLength: 3 },
    amount: { type: "number" },
    type: { type: "string", enum: ["income", "expense"] },
    category: { type: "string" },
    desc: { type: "string", nullable: true, default: "" },
  },
  required: ["date", "name", "amount", "type", "category"],
  additionalProperties: false,
};

async function CreateEventAbl(req, res) {
  try {
    let event = req.body;

    // validate vstupu
    const valid = ajv.validate(schema, event);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Vytvoření finanční události
    const createdEvent = await transactionDao.create(event);
    res.json(createdEvent);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateEventAbl;
