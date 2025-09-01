import type { NextFunction, Response } from "express";
import utils from "../utils/index.js"
import type { authRequest } from "./auth.middleware.js";

const userSchema = utils.userSchema;

const validateUserMiddleware = (req:authRequest, res:Response, next: NextFunction) =>{
    try {
        userSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            error: "Invalid request data",
            details: error
        })
    }
}

export default validateUserMiddleware;