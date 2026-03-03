import { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { AppError } from '../utils';


const getFileHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diskPath = '/uploads/AAA_Company-121ce14e-9b12-4580-9341-90f33b178c2a/2026/3'

    const filePath = path.join(process.cwd(), diskPath, req.query.fileName as string)

    if (!fs.existsSync(filePath)) {
      throw new AppError('File not found', 404)
    }

    const stream = fs.createReadStream(filePath)

    // res.setHeader('Content-Disposition', `attachment; filename="${req.query.fileName}"`);
    stream.pipe(res);
    
    // return res.status(200).sendFile(filePath)
    // return res.download(filePath)

  } catch (error) {
    next(error)
  }
}

export default getFileHandler