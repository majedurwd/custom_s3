import { Request, Response, NextFunction } from 'express';


const uploadsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.body = JSON.stringify(req.body);
    console.log(req.body);
    
    return res.status(200).json({
      code: 200,
      success: true,
      message: "File uploaded successfully",
      data: {
        file: req.file,
        body: JSON.parse(req.body.user)
      }
    });
  } catch (error) {
    next(error)
  }
}

export default uploadsHandler

