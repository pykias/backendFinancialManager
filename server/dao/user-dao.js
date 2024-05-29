const users = []; // This should be replaced by actual database logic

const findByEmail = async (email) => {
    return users.find(user => user.email === email);
};

const create = async (user) => {
    user.id = users.length + 1;
    users.push(user);
    return user;
};

const get = async (id) => {
    return users.find(user => user.id === id);
};

const list = async () => {
    return users;
};

const update = async (updatedUser) => {
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        return users[index];
    }
    return null;
};

const remove = async (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
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
