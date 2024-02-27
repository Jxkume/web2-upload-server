import express, { Request } from "express";
import { uploadPhoto } from "../controllers/uploadController";
import multer, { FileFilterCallback } from "multer";
import { authenticate, makeThumbnail } from "../../middlewares";

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ dest: "./uploads/", fileFilter });
const router = express.Router();

router
  .route("/")
  .post(authenticate, upload.single("photo"), makeThumbnail, uploadPhoto);

export default router;
