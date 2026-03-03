import { Router } from 'express';
import { authenticator, uploader } from '../middlewares';
import { getFileHandler, uploadsHandler } from '../handler';


const filesRouter = Router();


filesRouter
  .route('/')
  .post(authenticator, uploader({
		mimeTypes: ["image/jpeg", "image/png"],
		maxFileSize: 10 * 1024 * 1024,
		type: "single",
  }), uploadsHandler)
  .get(authenticator, getFileHandler)


export default filesRouter;

