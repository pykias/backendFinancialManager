const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");
const transactionDao = require("../../dao/transaction-dao.js");
const attendanceDao = require("../../dao/attendance-dao.js");

const schema = {
    type: "object",
    properties: {
        transactionId: { type: "string", minLength: 32, maxLength: 32 },
        userId: { type: "string", minLength: 32, maxLength: 32 },
    },
    required: ["transactionId", "userId"],
    additionalProperties: false,
};

async function GetAbl(req, res) {
    try {
        let dtoIn = req.body;

        // validate input
        const valid = ajv.validate(schema, dtoIn);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // check if user exists
        const user = await userDao.get(dtoIn.userId);
        if (!user) {
            res.status(404).json({
                code: "userNotFound",
                message: `User ${dtoIn.userId} not found`,
            });
            return;
        }

        // check if transaction exists
        const transaction = await transactionDao.get(dtoIn.transactionId);
        if (!transaction) {
            res.status(404).json({
                code: "transactionNotFound",
                message: `Transaction ${dtoIn.transactionId} not found`,
            });
            return;
        }

        // get attendance
        const attendance = await attendanceDao.get(dtoIn.userId, dtoIn.transactionId);
        if (!attendance) {
            res.status(404).json({
                code: "attendanceNotFound",
                message: `Attendance for user ${dtoIn.userId} and transaction ${dtoIn.transactionId} not found`,
            });
            return;
        }

        res.json(attendance);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = GetAbl;
