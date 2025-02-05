import { NextFunction, Request, Response} from "express"

declare module "express-serve-static-core" {
    interface Response {
      sendResponse: (data: any, statusCode?: number) => void;
    }
}

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.sendResponse = (data: any, statusCode: number = 200) => {
            const response = { success: true, status: statusCode, data }
            res.status(statusCode).json(response)
        }
        next()
    } catch (error) {
        res.status(400).json({status: false, message: `Error occurered: ${error}`})
        next()
    }
}