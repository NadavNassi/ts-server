"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
const als_service_1 = require("./als.service");
// const fs = require('fs')
// const asyncLocalStorage = require('./als.service')
const logsDir = './logs';
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir);
}
//define the time format
function getTime() {
    let now = new Date();
    return now.toLocaleString();
}
function isError(e) {
    return e && e.stack && e.message;
}
function doLog(level, ...args) {
    console.log('LOGGER:', args);
    const strs = args.map(arg => (typeof arg === 'string') ? arg :
        (isError(arg)) ? arg : JSON.stringify(arg));
    var line = strs.join(' | ');
    const store = als_service_1.asyncLocalStorage.getStore();
    // @ts-ignore
    const sessionId = store === null || store === void 0 ? void 0 : store.sessionId;
    const sid = sessionId ? `(sid: ${sessionId})` : '';
    line = `${getTime()} - ${level} - ${line} ${sid}\n`;
    console.log(line);
    fs_1.default.appendFileSync('./logs/backend.log', line);
}
exports.logger = {
    debug(...args) {
        // if (process.env.NODE_NEV === 'production') return
        doLog('DEBUG', ...args);
    },
    info(...args) {
        doLog('INFO', ...args);
    },
    warn(...args) {
        doLog('WARN', ...args);
    },
    error(...args) {
        doLog('ERROR', ...args);
    }
};
