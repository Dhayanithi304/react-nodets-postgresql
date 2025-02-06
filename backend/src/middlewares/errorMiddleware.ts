import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

// Global error handler middleware
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = "Internal Server Error";

  // Check if the error is a CustomError
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // Log unexpected errors or non-custom errors if necessary
    console.error("Unexpected Error:", err);
  }

  // Handle logging if needed (e.g., for debugging purposes)
  // logger.error({
  //   message,
  //   stack: err.stack,
  //   method: req.method,
  //   path: req.url,
  //   statusCode,
  // });

  // Send the error response to the client
  res.status(statusCode).json({ error: message });
  return
  // Do not rethrow the error to avoid the server crashing
  // The function will terminate gracefully after sending the response
}
