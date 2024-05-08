const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const transactionFolderPath = path.join(__dirname, "storage", "transactions");

// Pomocná funkce pro načtení souboru s transakcí podle ID
function readTransactionFile(transactionId) {
    try {
        const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null; // Soubor nebyl nalezen
        throw { code: "failedToReadTransaction", message: error.message };
    }
}

// Vytvoření nové transakce
function create(transaction) {
    try {
        const transactionId = crypto.randomBytes(16).toString("hex");
        transaction.id = transactionId;
        const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(transaction), "utf8");
        return transaction;
    } catch (error) {
        throw { code: "failedToCreateTransaction", message: error.message };
    }
}

// Získání transakce podle ID
function get(transactionId) {
    return readTransactionFile(transactionId);
}

// Aktualizace transakce
function update(transaction) {
    const currentTransaction = get(transaction.id);
    if (!currentTransaction) {
        return null; // Transakce neexistuje
    }

    // Aktualizace stávající transakce novými daty
    const updatedTransaction = { ...currentTransaction, ...transaction };
    const filePath = path.join(transactionFolderPath, `${transaction.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(updatedTransaction), "utf8");
    return updatedTransaction;
}

// Odstranění transakce
function remove(transactionId) {
    try {
        const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
        fs.unlinkSync(filePath); // Smazání souboru
    } catch (error) {
        if (error.code === "ENOENT") return {}; // Soubor neexistuje
        throw { code: "failedToRemoveTransaction", message: error.message };
    }
}

// Výpis všech transakcí
function list() {
    try {
        const files = fs.readdirSync(transactionFolderPath);
        return files.map((file) => readTransactionFile(file.replace(".json", ""))).filter(Boolean); // Odebere neplatné hodnoty
    } catch (error) {
        throw { code: "failedToListTransactions", message: error.message };
    }
}

// Export funkcí pro použití v dalších částech aplikace
module.exports = {
    create,
    get,
    update,
    remove,
    list,
};
