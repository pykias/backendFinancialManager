const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const transactionFolderPath = path.join(__dirname, 'storage', 'transactions');

// Pomocná funkce pro načtení transakce z souboru
function readTransactionFile(transactionId) {
    try {
        const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
        const fileData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === 'ENOENT') return null; // Soubor nenalezen
        throw error;
    }
}

// Vytvoření nové transakce
function create(transaction) {
    try {
        const transactionId = crypto.randomBytes(16).toString('hex');
        transaction.id = transactionId;
        const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(transaction), 'utf8');
        return transaction;
    } catch (error) {
        throw new Error(`Failed to create transaction: ${error.message}`);
    }
}

// Získání transakce podle ID
function get(transactionId) {
    return readTransactionFile(transactionId);
}

// Aktualizace transakce
function update(transactionId, newData) {
    const transaction = get(transactionId);
    if (!transaction) throw new Error('Transaction not found');

    Object.assign(transaction, newData);
    const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(transaction), 'utf8');
    return transaction;
}

// Odstranění transakce
function remove(transactionId) {
    try {
        const filePath = path.join(transactionFolderPath, `${transactionId}.json`);
        fs.unlinkSync(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') return; // Soubor již neexistuje
        throw new Error(`Failed to delete transaction: ${error.message}`);
    }
}

// Výpis všech transakcí
function list() {
    try {
        const files = fs.readdirSync(transactionFolderPath);
        return files.map(file => readTransactionFile(file.replace('.json', '')));
    } catch (error) {
        throw new Error(`Failed to list transactions: ${error.message}`);
    }
}

module.exports = {
    create,
    get,
    update,
    remove,
    list
};
