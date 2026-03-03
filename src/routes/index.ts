import { Router } from 'express';
import filesRouter from './files.route';


const router = Router();


router.use('/files', filesRouter);


export default router;