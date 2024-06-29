const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'log.json');

function logChange(action, entity, data) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        action,
        entity,
        data
    };

    const logData = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf8')) : [];
    logData.push(logEntry);
    fs.writeFileSync(logPath, JSON.stringify(logData, null, 2));
}

module.exports = logChange;
 