import { Request, Response, NextFunction } from "express";
import CustomError from "../../classes/CustomError";
import { UploadResponse } from "../../types/MessageTypes";

const uploadPhoto = async (
  req: Request,
  res: Response<UploadResponse>,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const err = new CustomError("Photo not provided", 400);
      throw err;
    }

    // Tästä seuraavasta rivistä en ole aivan 100% varma mutta we will see :D
    if (!req.file.mimetype.endsWith(".img")) {
      const err = new CustomError("Uploaded file is not an image", 400);
      throw err;
    }

    const response: UploadResponse = {
      message: "Photo uploaded",
      data: {
        filename: req.file.filename,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export { uploadPhoto };
