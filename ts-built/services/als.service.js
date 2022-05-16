"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncLocalStorage = void 0;
// const { AsyncLocalStorage } = require('async_hooks');
const async_hooks_1 = require("async_hooks");
exports.asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
// The AsyncLocalStorage singleton
// module.exports = asyncLocalStorage;
