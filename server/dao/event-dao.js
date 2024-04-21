const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const eventFolderPath = path.join(__dirname, "storage", "eventList");

// Method to read a financial event from a file
function get(eventId) {
    try {
        const filePath = path.join(eventFolderPath, `${eventId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null; // No such file or directory
        throw { code: "failedToReadEvent", message: error.message };
    }
}

// Method to write a financial event to a file
function create(event) {
    try {
        event.id = crypto.randomBytes(16).toString("hex"); // Unique ID for the event
        const filePath = path.join(eventFolderPath, `${event.id}.json`);
        const fileData = JSON.stringify(event);
        fs.writeFileSync(filePath, fileData, "utf8");
        return event;
    } catch (error) {
        throw { code: "failedToCreateEvent", message: error.message };
    }
}

// Method to update a financial event in a file
function update(event) {
    try {
        const currentEvent = get(event.id);
        if (!currentEvent) return null; // Event does not exist
        const newEvent = { ...currentEvent, ...event }; // Merge data
        const filePath = path.join(eventFolderPath, `${event.id}.json`);
        const fileData = JSON.stringify(newEvent);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newEvent;
    } catch (error) {
        throw { code: "failedToUpdateEvent", message: error.message };
    }
}

// Method to remove a financial event from a file
function remove(eventId) {
    try {
        const filePath = path.join(eventFolderPath, `${eventId}.json`);
        fs.unlinkSync(filePath); // Delete the file
        return {};
    } catch (error) {
        if (error.code === "ENOENT") return {}; // No such file or directory
        throw { code: "failedToRemoveEvent", message: error.message };
    }
}

// Method to list financial events in a folder
function list() {
    try {
        const files = fs.readdirSync(eventFolderPath);
        return files.map((file) => {
            const fileData = fs.readFileSync(
                path.join(eventFolderPath, file),
                "utf8"
            );
            return JSON.parse(fileData);
        }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
    } catch (error) {
        throw { code: "failedToListEvents", message: error.message };
    }
}

module.exports = {
    get,
    create,
    update,
    remove,
    list,
};
