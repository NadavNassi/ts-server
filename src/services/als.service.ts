// const { AsyncLocalStorage } = require('async_hooks');
import { AsyncLocalStorage } from 'async_hooks'
export const asyncLocalStorage = new AsyncLocalStorage();

// The AsyncLocalStorage singleton
// module.exports = asyncLocalStorage;