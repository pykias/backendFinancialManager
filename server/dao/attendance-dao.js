const fs = require("fs");
const path = require("path");

const attendanceFolderPath = path.join(__dirname, "storage", "attendanceList");

// Funkce pro získání informací o účasti
function get(userId, transactionId) {
    try {
        const attendanceList = list();
        const attendance = attendanceList.find(
            (a) => a.userId === userId && a.transactionId === transactionId
        );
        return attendance;
    } catch (error) {
        throw { code: "failedToReadAttendance", message: error.message };
    }
}

// Funkce pro aktualizaci informací o účasti
function update(attendance) {
    try {
        // Získání existujících údajů o účasti nebo vytvoření nových
        const currentAttendance = get(attendance.userId, attendance.transactionId) || {};
        if (currentAttendance.file) {
            const filePath = path.join(attendanceFolderPath, currentAttendance.file);
            fs.unlinkSync(filePath);
        }

        // Kombinace nových a stávajících údajů
        const newAttendance = { ...currentAttendance, ...attendance };

        // Sestavení cesty k souboru pro uložení údajů o účasti
        const filePath = path.join(
            attendanceFolderPath,
            `${newAttendance.userId}_${newAttendance.transactionId}_${newAttendance.attendance}_${newAttendance.guests}.txt`
        );

        // Uložení údajů o účasti
        fs.writeFileSync(filePath, "", "utf8");
        return newAttendance;
    } catch (error) {
        throw { code: "failedToUpdateAttendance", message: error.message };
    }
}

// Funkce pro odstranění
function remove(userId, transactionId) {
    try {
        const attendance = get(userId, transactionId);
        if (attendance) {
            const filePath = path.join(attendanceFolderPath, attendance.file);
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

// Funkce pro výpis všech účastí ve složce
function list() {
    try {
        const files = fs.readdirSync(attendanceFolderPath);
        return files.map((file) => {
            const attendanceData = file.replace(".txt", "").split("_");
            return {
                userId: attendanceData[0],
                transactionId: attendanceData[1],
                attendance: attendanceData[2],
                guests: Number(attendanceData[3]),
                file,
            };
        });
    } catch (error) {
        throw { code: "failedToListAttendances", message: error.message };
    }
}

// Funkce pro vytvoření mapy účastí podle události
function transactionMap() {
    const attendanceList = list();
    const attendanceMap = {};
    attendanceList.forEach((attendance) => {
        if (!attendanceMap[attendance.transactionId]) attendanceMap[attendance.transactionId] = {};
        if (!attendanceMap[attendance.transactionId][attendance.transactionId]) attendanceMap[attendance.transactionId][attendance.userId] = {};
        attendanceMap[attendance.transactionId][attendance.userId] = {
            attendance: attendance.attendance,
            guests: attendance.guests,
        };
    });
    return attendanceMap;
}

// Funkce pro vytvoření mapy účastí podle uživatele
function userMap() {
    const attendanceList = list();
    const attendanceMap = {};
    attendanceList.forEach((attendance) => {
        if (!attendanceMap[attendance.userId]) attendanceMap[attendance.userId] = {};
        if (!attendanceMap[attendance.userId][attendance.transactionId]) attendanceMap[attendance.userId][attendance.transactionId] = {};
        attendanceMap[attendance.userId][attendance.transactionId] = {
            attendance: attendance.attendance,
            guests: attendance.guests,
        };
    });
    return attendanceMap;
}

// Export funkcí pro ostatní části aplikace
module.exports = {
    get,
    update,
    remove,
    list,
    transactionMap,
    userMap,
};
