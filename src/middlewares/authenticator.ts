import { Request, Response, NextFunction, RequestHandler } from 'express'
import { v4 as uuid } from 'uuid'

const authenticator: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    user_id: uuid(),
    // company_id: uuid(),
    company_id: '121ce14e-9b12-4580-9341-90f33b178c2a',
    companyName: 'AAA Company'
  }
  next();
}

export default authenticator