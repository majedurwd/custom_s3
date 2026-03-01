import { Request, Response, NextFunction, RequestHandler } from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AppError } from "../utils";

type AllowedFileTypes = "image/jpeg" | "image/png" | "image/jpg" | "document/pdf" | "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
interface IUploadHandlerParams {
  // uploadMiddleware: RequestHandler;
  mimeTypes: AllowedFileTypes[];
  maxFileSize: number; // in kb
  isUpdate?: boolean;
  type: 'single' | 'multiple';
}

const uploadHandler = ({ mimeTypes, maxFileSize, isUpdate, type }: IUploadHandlerParams) => {

// Defining the destination for uploaded files
  const destination = (req: Request, file: Express.Multer.File, cb: any) => {
    console.log("File", file)
    const companyDir = path.join(__dirname, `../../uploads/${req.user.companyName.replace(' ', '_')}-${req.user.company_id}/${new Date().getFullYear()}/${new Date().getMonth() + 1}`);
    console.log("COMPANY DIR", companyDir);
    fs.mkdirSync(companyDir, { recursive: true });
    cb(null, companyDir);
  }

  const storage = multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || "";
      const safeName = file.fieldname.replace(/[^a-z0-9_-]/gi, "_");
      cb(null, `${Date.now()}-${safeName}${ext}`);
    },
  });

  const fileFilter = (
    _req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    if (!mimeTypes.includes(file.mimetype as AllowedFileTypes)) {
      return cb(new AppError(`Unsupported file type: ${file.mimetype}`, 400));
    }
  
    cb(null, true);
  };
  
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }, // 10 MB
  });

  return (req: Request, res: Response, next: NextFunction) => {
    if (type === 'single') {
      upload.single('img')(req, res, (err) => {
        if (err) {
          return next(err);
        }
        next();
      })
    } else {
      upload.array('img')(req, res, (err) => {
        if (err) {
          return next(err);
        }
        next();
      })
    }
  }

}

export default uploadHandler