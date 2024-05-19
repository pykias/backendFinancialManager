const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const transactionFolderPath = path.join(__dirname, "storage", "transactionList");

async function ensureFolderExists() {
    try {
        await fs.readdir(transactionFolderPath);
    } catch (error) {
        if (error.code === "ENOENT") {
            await fs.mkdir(transactionFolderPath, { recursive: true });
        } else {
            throw { code: "failedToEnsureFolder", message: error.message };
        }
    }
}

async function readTransactionFile(transactionId) {
    const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
    try {
        const fileData = await fs.readFile(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadTransaction", message: error.message };
    }
}

async function create(transaction) {
    const transactionId = crypto.randomBytes(16).toString("hex");
    transaction.id = transactionId;
    const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
    await fs.writeFile(filePath, JSON.stringify(transaction), "utf8");
    return transaction;
}

async function get(transactionId) {
    return readTransactionFile(transactionId);
}

async function update(transaction) {
    const currentTransaction = await get(transaction.id);
    if (!currentTransaction) {
        throw { code: "TransactionNotFound", message: "Transaction does not exist." };
    }
    const updatedTransaction = { ...currentTransaction, ...transaction };
    const filePath = path.join(transactionFolderPath, `${transaction.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(updatedTransaction), "utf8");
    return updatedTransaction;
}

async function remove(transactionId) {
    const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
    try {
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code === "ENOENT") {
            return {};
        }
        throw { code: "failedToRemoveTransaction", message: error.message };
    }
}

async function list() {
    try {
        const files = await fs.readdir(transactionFolderPath);
        const transactions = await Promise.all(files.map(file => readTransactionFile(file.replace(".json", ""))));
        return transactions.filter(Boolean);
    } catch (error) {
        throw { code: "failedToListTransactions", message: error.message };
    }
}

ensureFolderExists();

module.exports = {
    create,
    get,
    update,
    remove,
    list,
};
