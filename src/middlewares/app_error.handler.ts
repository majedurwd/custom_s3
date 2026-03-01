import { ErrorRequestHandler, Response } from 'express';
import { AppError } from '../utils';

const handleCustomDevError = (error: AppError, res: Response) => {
  return res.status(error.statusCode).json({
    code: error.statusCode,
    success: false,
    message: error.message,
    errors: error.errors,
    stackTrace: error.stack
  });
};

const handleCustomProdError = (error: AppError, res: Response) => {
  return res.status(error.statusCode).json({
    code: error.statusCode,
    success: false,
    message: error.message,
    errors: error.errors
  });
};

const handleAppError = (res: Response, error: AppError) => {
  return res
    .status(error.statusCode)
    .json({ code: error.statusCode, success: false, message: error.message, errors: error.errors });
};

const appErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // For unhandled errors, send a generic message
  const statusCode = error.statusCode || 500;
  const message = error.message || 'An unexpected error occurred';


  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  if (error instanceof AppError) {
    if (process.env.node_env === 'production') {
      return handleCustomProdError(error, res);
    }
    return handleCustomDevError(error, res);
  }

  return res.status(statusCode).json({
    code: statusCode,
    success: false,
    errorCode: 'internal_server_error',
    message
  });
};

export default appErrorHandler;
