const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");
const transactionDao = require("../../dao/transaction-dao.js");

const schema = {
    type: "object",
    properties: {
        userId: { type: "string", minLength: 32, maxLength: 32 },
        transactionId: { type: "string", minLength: 32, maxLength: 32 },
        amount: { type: "number" },
        date: { type: "string", format: "date-time" },
        category: { type: "string" },
        note: { type: "string", maxLength: 255, nullable: true }
    },
    required: ["userId", "transactionId", "amount", "date", "category"],
    additionalProperties: false,
};

async function UpdateTransactionAbl(req, res) {
    try {
        let dtoIn = req.body;

        // validate input
        const valid = ajv.validate(schema, dtoIn);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "Input data format is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // check if user exists
        const user = await userDao.get(dtoIn.userId);
        if (!user) {
            res.status(404).json({
                code: "userNotFound",
                message: `User with id ${dtoIn.userId} not found`,
            });
            return;
        }

        // check if transactions exists
        const transaction = await transactionDao.get(dtoIn.transactionId);
        if (!transaction) {
            res.status(404).json({
                code: "transactionNotFound",
                message: `Transaction with id ${dtoIn.transactionId} not found`,
            });
            return;
        }

        // Assuming transactionDao.update is a function that updates a transactions
        const updatedTransaction = await transactionDao.update(dtoIn.transactionId, dtoIn);

        res.json(updatedTransaction);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = UpdateTransactionAbl;
