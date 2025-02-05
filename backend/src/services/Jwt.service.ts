import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

export const generateToken = (data: any) => {
    return jwt.sign(data, process.env.DB_SECRET_KEY as string, { expiresIn: "1hr" })   
}

export const verifyAuthToken = (token: string): any | null => {  
    try {
        return jwt.verify(token, process.env.DB_SECRET_KEY as string);
    } catch (error) {
        throw new Error("Invaid JWT");
    }
}