"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
if (process.env.NODE_ENV === 'production') {
    exports.config = require('./prod');
}
else {
    exports.config = require('./dev');
}
