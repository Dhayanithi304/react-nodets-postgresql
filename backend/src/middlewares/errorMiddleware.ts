import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

//   logger.error({
//     message,
//     stack: err.stack,
//     method: req.method,
//     path: req.url,
//     statusCode,
//   });

  res.status(statusCode).json({ error: message });
}
