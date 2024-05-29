const userDao = require("../../dao/user-dao");
const bcrypt = require("bcrypt");

const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

// Schéma pro ověření vstupu uživatele
const schema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 3 },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 }
    },
    required: ["name", "email", "password"],
    additionalProperties: false,
};

async function CreateAbl(req, res) {
    try {
        let user = req.body;

        // Validace vstupu
        const valid = ajv.validate(schema, user);
        if (!valid) {
            return res.status(400).json({
                code: "dtoInIsNotValid",
                message: "Input data is not valid",
                validationError: ajv.errors,
            });
        }

        // Kontrola existence emailu
        const existingUser = await userDao.findByEmail(user.email);
        if (existingUser) {
            return res.status(400).json({
                code: "emailAlreadyExists",
                message: `User with email ${user.email} already exists`,
            });
        }

        user.password = await bcrypt.hash(user.password, 10);

        // Vytvoření uživatele
        const createdUser = await userDao.create(user);
        res.status(201).json(createdUser);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = CreateAbl;
