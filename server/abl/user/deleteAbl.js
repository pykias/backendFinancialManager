const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");
const attendanceDao = require("../../dao/attendance-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string", minLength: 32, maxLength: 32 },
    },
    required: ["id"],
    additionalProperties: false,
};

async function DeleteAbl(req, res) {
    try {
        const reqParams = req.body;

        // Validace
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            return res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
        }

        //
        const hasAttendances = await attendanceDao.checkUserAttendance(reqParams.id);
        if (hasAttendances) {
            return res.status(400).json({
                code: "userHasAttendances",
                message: `User with id ${reqParams.id} has attendances and cannot be deleted`,
            });
        }

        // Oodstrani uzivatele
        await userDao.remove(reqParams.id);

        res.json({ message: `User with id ${reqParams.id} successfully deleted` });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = DeleteAbl;
