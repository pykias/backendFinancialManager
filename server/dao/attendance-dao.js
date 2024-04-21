const fs = require("fs");
const path = require("path");

const attendanceFolderPath = path.join(__dirname, "storage", "attendance");

// Funkce pro získání informací o účasti
function get(userId, financeEventId) {
    try {
        const attendanceList = list();
        const attendance = attendanceList.find(
            (a) => a.userId === userId && a.financeEventId === financeEventId
        );
        return attendance;
    } catch (error) {
        throw { code: "failedToReadAttendance", message: error.message };
    }
}

// Funkce pro aktualizaci informací o účasti
function update(attendance) {
    try {
        // Získání stávajících údajů o účasti nebo vytvoření nových, pokud neexistují
        const currentAttendance = get(attendance.userId, attendance.financeEventId) || {};
        const newAttendance = { ...currentAttendance, ...attendance };

        // Sestavení cesty k souboru pro uložení údajů o účasti
        const filePath = path.join(
            attendanceFolderPath,
            `${newAttendance.userId}_${newAttendance.financeEventId}.json`
        );

        // Uložení aktualizovaných údajů o účasti do souboru
        fs.writeFileSync(filePath, JSON.stringify(newAttendance), "utf8");
        return newAttendance;
    } catch (error) {
        throw { code: "failedToUpdateAttendance", message: error.message };
    }
}

// Funkce pro odstranění informací o účasti
function remove(userId, financeEventId) {
    try {
        const attendance = get(userId, financeEventId);
        if (attendance) {
            const filePath = path.join(attendanceFolderPath, `${userId}_${financeEventId}.json`);
            fs.unlinkSync(filePath);
        }
        return {};
    } catch (error) {
        if (error.code === "ENOENT") {
            return {};
        }
        throw { code: "failedToRemoveAttendance", message: error.message };
    }
}

// Funkce pro výpis všech účastí
function list() {
    try {
        const files = fs.readdirSync(attendanceFolderPath);
        return files.map((file) => {
            const content = fs.readFileSync(path.join(attendanceFolderPath, file), "utf8");
            return JSON.parse(content);
        });
    } catch (error) {
        throw { code: "failedToListAttendances", message: error.message };
    }
}

// Exportování funkcí pro použití v ostatních částech aplikace
module.exports = {
    get,
    update,
    remove,
    list,
};