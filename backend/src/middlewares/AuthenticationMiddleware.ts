import { NextFunction, Response, Request } from "express";
import { verifyAuthToken } from "../services/Jwt.service";

export const AuthenticationMiddleware = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearar ', "")
    if(!token){
        res.status(401).json({error: "Unauthorized: No token provided"})
        return 
    }
    try {
        const user = verifyAuthToken(token);
        (req as any).user = user
    } catch (error) {
        res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }
    const rolesArr = roles.filter(role => role.trim() !== "")
    const userRoles = (req as any).user?.roles

    if(rolesArr.length > 0){
        const hasRole = rolesArr.some(role => userRoles.includes[role])
        if(!hasRole){
            res.status(401).json({error: "Unauthorized: You don't have access to this api"})
            return 
        }
    }
    next()
}} 