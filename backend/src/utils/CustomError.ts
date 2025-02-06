export class CustomError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  // Specific Error Types 
  export class AuthError extends CustomError {
    constructor(message = "Unauthorized Access") {
      super(message, 401);
    }
  }

  export class ForBiddenError extends CustomError {
    constructor(message = "Forbidden: Access denied") {
      super(message, 403);
    }
  }
  
  
  export class ValidationError extends CustomError {
    constructor(message = "Invalid Input") {
      super(message, 400);
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message = "Resource Not Found") {
      super(message, 404);
    }
  }
  