import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction, RequestHandler } from "express";

// Defining the destination for uploaded files
const destination = (req: Request, file: Express.Multer.File, cb: any) => {
	const companyDir = path.join(__dirname, `../../uploads/${req.user.company_id}`);
	fs.mkdirSync(companyDir, { recursive: true });
	cb(null, companyDir);
}

// Defining the storage for uploaded files
const storage = multer.diskStorage({
	destination: destination,
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname) || "";
		const safeName = file.fieldname.replace(/[^a-z0-9_-]/gi, "_");
		cb(null, `${Date.now()}-${safeName}${ext}`);
	},
});

// Defining the file filter
const fileFilter = (
	_req: any,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback,
) => {
	const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "document/pdf", "application/msword"];
	if (!allowedMimeTypes.includes(file.mimetype)) {
		return cb(new Error(`Unsupported file type: ${file.mimetype}`));
	}

	cb(null, true);
};

export const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
});

export const uploadHandler = (uploadMiddleware: RequestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		uploadMiddleware(req, res, (err) => {
			if (err) {
				return next(err);
			}
			next();
		});
	};
};
