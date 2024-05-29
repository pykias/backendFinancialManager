const userDao = require("../../dao/user-dao");

async function DeleteAbl(req, res) {
    try {
        const { id } = req.body;
        const success = await userDao.remove(id);

        if (success) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = DeleteAbl;
