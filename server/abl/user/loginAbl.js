const userDao = require("../../dao/user-dao");
const bcrypt = require("bcrypt");

const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

// Schéma pro ověření vstupu přihlášení
const schema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 }
    },
    required: ["email", "password"],
    additionalProperties: false,
};

async function LoginAbl(req, res) {
    try {
        const { email, password } = req.body;

        // Validace vstupu
        const valid = ajv.validate(schema, { email, password });
        if (!valid) {
            return res.status(400).json({
                code: "dtoInIsNotValid",
                message: "Input data is not valid",
                validationError: ajv.errors,
            });
        }

        const user = await userDao.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = LoginAbl;
