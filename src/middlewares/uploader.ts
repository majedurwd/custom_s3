import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const fileUploader = (type: 'single' | 'array' = 'single', fieldName = 'file', maxCount = 10) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("fileUploader");
    try {
      const uploadDir = path.join(__dirname, '../../uploads');

      const ensureUploadDir = () => {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          ensureUploadDir();
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname) || '';
          const safeName = file.fieldname.replace(/[^a-z0-9_-]/gi, '_');
          cb(null, `${Date.now()}-${safeName}${ext}`);
        }
      });

      const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        // Accept all files by default. Modify this to restrict file types.
        cb(null, true);
      };

      const upload = multer({
        storage,
        fileFilter,
        limits: { fileSize: 10 * 1024 * 1024 } // 10MB
      });

      if (type === 'single') {
        upload.single(fieldName)(req, res, next);
      } else if (type === 'array') {
        upload.array(fieldName, maxCount)(req, res, next);
      }

      // Helpers to use in routes
      // const single = (fieldName = 'file'): RequestHandler => {
      //   return upload.single(fieldName) as unknown as RequestHandler;
      // };

      // const array = (fieldName = 'files', maxCount = 10): RequestHandler => {
      //   return upload.array(fieldName, maxCount) as unknown as RequestHandler;
      // };
      console.log("From middleware", req.body);
      console.log("From middleware", req.file);
      next();
    } catch (error) {
      next(error)
    }
  }
}

export default fileUploader;



// const uploadDir = path.join(__dirname, '../../uploads');

// const ensureUploadDir = () => {
// 	try {
// 		fs.mkdirSync(uploadDir, { recursive: true });
// 	} catch (err) {
// 		// ignore if exists or cannot create (runtime will surface errors)
// 	}
// };

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		ensureUploadDir();
// 		cb(null, uploadDir);
// 	},
// 	filename: (req, file, cb) => {
// 		const ext = path.extname(file.originalname) || '';
// 		const safeName = file.fieldname.replace(/[^a-z0-9_-]/gi, '_');
// 		cb(null, `${Date.now()}-${safeName}${ext}`);
// 	}
// });

// const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
// 	// Accept all files by default. Modify this to restrict file types.
// 	cb(null, true);
// };

// export const upload = multer({
// 	storage,
// 	fileFilter,
// 	limits: { fileSize: 10 * 1024 * 1024 } // 10MB
// });

// // Helpers to use in routes
// export const single = (fieldName = 'file'): RequestHandler => {
// 	return upload.single(fieldName) as unknown as RequestHandler;
// };

// export const array = (fieldName = 'files', maxCount = 10): RequestHandler => {
// 	return upload.array(fieldName, maxCount) as unknown as RequestHandler;
// };

// export default upload;
