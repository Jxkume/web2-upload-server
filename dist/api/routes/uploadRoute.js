"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadController_1 = require("../controllers/uploadController");
const multer_1 = __importDefault(require("multer"));
const middlewares_1 = require("../../middlewares");
const fileFilter = (request, file, cb) => {
    if (file.mimetype.includes("image")) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({ dest: "./uploads/", fileFilter });
const router = express_1.default.Router();
router
    .route("/")
    .post(middlewares_1.authenticate, upload.single("photo"), middlewares_1.makeThumbnail, uploadController_1.uploadPhoto);
exports.default = router;
//# sourceMappingURL=uploadRoute.js.map