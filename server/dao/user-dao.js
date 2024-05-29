const fs = require('fs');
const path = require('path');

const userListPath = path.join(__dirname, '../storage/userList');

// Ensure userList directory exists
if (!fs.existsSync(userListPath)) {
    fs.mkdirSync(userListPath, { recursive: true });
}

const findByEmail = async (email) => {
    const filePath = path.join(userListPath, `${email}.json`);
    if (fs.existsSync(filePath)) {
        const userData = fs.readFileSync(filePath);
        return JSON.parse(userData);
    }
    return null;
};

const create = async (user) => {
    const filePath = path.join(userListPath, `${user.email}.json`);
    user.id = Date.now(); // Assign a unique ID based on timestamp
    fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
    return user;
};

const get = async (id) => {
    const files = fs.readdirSync(userListPath);
    for (const file of files) {
        const user = JSON.parse(fs.readFileSync(path.join(userListPath, file)));
        if (user.id.toString() === id.toString()) {
            return user;
        }
    }
    return null;
};

const list = async () => {
    const files = fs.readdirSync(userListPath);
    return files.map(file => JSON.parse(fs.readFileSync(path.join(userListPath, file))));
};

const update = async (updatedUser) => {
    const filePath = path.join(userListPath, `${updatedUser.email}.json`);
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(updatedUser, null, 2));
        return updatedUser;
    }
    return null;
};

const remove = async (id) => {
    const files = fs.readdirSync(userListPath);
    for (const file of files) {
        const user = JSON.parse(fs.readFileSync(path.join(userListPath, file)));
        if (user.id.toString() === id.toString()) {
            fs.unlinkSync(path.join(userListPath, file));
            return true;
        }
    }
    return false;
};

module.exports = {
    findByEmail,
    create,
    get,
    list,
    update,
    remove,
};
