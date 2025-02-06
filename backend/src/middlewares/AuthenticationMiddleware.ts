import { NextFunction, Response, Request } from "express";
import { verifyAuthToken } from "../services/Jwt.service";

export const AuthenticationMiddleware = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearar ', "")
    if(!token){
        return res.status(401).json({msg: "Unauthorized: No token provided"})
    }

    try {
        const user = verifyAuthToken(token);
        (req as any).user = user
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
    const rolesArr = roles.filter(role => role.trim() !== "")
    const userRole = (req as any).user?.roles
}} 