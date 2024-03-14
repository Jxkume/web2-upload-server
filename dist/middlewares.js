"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeThumbnail = exports.authenticate = exports.errorHandler = exports.notFound = void 0;
const CustomError_1 = __importDefault(require("./classes/CustomError"));
const sharp_1 = __importDefault(require("sharp"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notFound = (req, res, next) => {
    const error = new CustomError_1.default(`🔍 - Not Found - ${req.originalUrl}`, 404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    console.error("errorHandler", err);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
};
exports.errorHandler = errorHandler;
const authenticate = async (req, res, next) => {
    console.log("authenticate");
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            next(new CustomError_1.default("Authentication failed", 401));
            return;
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            next(new CustomError_1.default("Authentication failed", 401));
            return;
        }
        next();
    }
    catch (error) {
        next(new CustomError_1.default("Authentication failed", 401));
    }
};
exports.authenticate = authenticate;
const makeThumbnail = async (req, res, next) => {
    try {
        console.log(req.file?.path);
        await (0, sharp_1.default)(req.file?.path)
            .resize(160, 160)
            .png()
            .toFile(req.file?.path + "_thumb");
        next();
    }
    catch (error) {
        next(new CustomError_1.default("Thumbnail not created", 500));
    }
};
exports.makeThumbnail = makeThumbnail;
//# sourceMappingURL=middlewares.js.map