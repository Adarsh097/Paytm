import type { NextFunction, Request, Response } from "express";
import  type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import ENV from "../configs/env.js";

export interface authRequest extends Request{
    userId?: string | JwtPayload
}

const authMiddleware = (req: authRequest, res:Response, next: NextFunction)=>{
    try {
        const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;

        if(!token){
            res.status(401).json({
                error: "Unauthorized"
            })
            return;
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET as string) as jwt.JwtPayload;

        req.userId = decoded.userId;

        next();

        
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export default authMiddleware;