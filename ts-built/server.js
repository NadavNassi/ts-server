"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const movie_routes_1 = require("./api/movie/movie.routes");
const logger_1 = require("./logger");
const error_handler_middleware_1 = require("./middleware/error-handler.middleware");
const app = express_1.default();
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
}
else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors_1.default(corsOptions));
}
app.use('/api/movie', movie_routes_1.movieRoutes);
app.get('/**', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
app.use(error_handler_middleware_1.errorHandler);
const port = process.env.PORT || 3030;
app.listen(port, () => logger_1.logger.info('Server is running on port: ' + port));
