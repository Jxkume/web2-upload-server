"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhoto = void 0;
const CustomError_1 = __importDefault(require("../../classes/CustomError"));
const uploadPhoto = async (req, res, next) => {
    try {
        if (!req.file) {
            const err = new CustomError_1.default("Photo not provided", 400);
            throw err;
        }
        // Tästä seuraavasta rivistä en ole aivan 100% varma mutta we will see :D
        if (!req.file.mimetype.endsWith(".img")) {
            const err = new CustomError_1.default("Uploaded file is not an image", 400);
            throw err;
        }
        const response = {
            message: "Photo uploaded",
            data: {
                filename: req.file.filename,
            },
        };
        res.json(response);
    }
    catch (error) {
        next(new CustomError_1.default(error.message, 400));
    }
};
exports.uploadPhoto = uploadPhoto;
//# sourceMappingURL=uploadController.js.map