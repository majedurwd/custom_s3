// src/types/express.d.ts
import mongoose from 'mongoose';
import { Multer } from 'multer';
import { AccountStatus } from './constants';
import { ClientUserRole } from './models';

declare global {
  namespace Express {
    interface Request {
      user: {
        user_id: mongoose.Types.ObjectId;
        company_id: mongoose.Types.ObjectId;
        token_version?: number;
        companyName: string;
      };
      file?: Express.Multer.File;
    }
  }
}

export {};
