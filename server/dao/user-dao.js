const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require('bcrypt');

const userFolderPath = path.join(__dirname, "storage", "userList");

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

function get(userId) {
    try {
        const filePath = path.join(userFolderPath, `${userId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadUser", message: error.message };
    }
}

async function create(user) {
    try {
        // Ensure the password is hashed before storing the user
        if (user.password) {
            user.password = await hashPassword(user.password);
        }

        user.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(userFolderPath, `${user.id}.json`);
        const fileData = JSON.stringify(user);
        fs.writeFileSync(filePath, fileData, "utf8");
        return user;
    } catch (error) {
        throw { code: "failedToCreateUser", message: error.message };
    }
}

function update(user) {
    try {
        const currentUser = get(user.id);
        if (!currentUser) return null;
        // Do not update password here. Create separate function to update password.
        const newUser = { ...currentUser, ...user };
        const filePath = path.join(userFolderPath, `${user.id}.json`);
        const fileData = JSON.stringify(newUser);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newUser;
    } catch (error) {
        throw { code: "failedToUpdateUser", message: error.message };
    }
}

function remove(userId) {
    try {
        const filePath = path.join(userFolderPath, `${userId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") {
            return {};
        }
        throw { code: "failedToRemoveUser", message: error.message };
    }
}

function list() {
    try {
        const files = fs.readdirSync(userFolderPath);
        const userList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
            return JSON.parse(fileData);
        });
        return userList;
    } catch (error) {
        throw { code: "failedToListUsers", message: error.message };
    }
}

module.exports = {
    get,
    create,
    update,
    remove,
    list,
};
