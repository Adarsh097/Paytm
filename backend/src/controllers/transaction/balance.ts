import type { Response } from "express";
import type { authRequest } from "../../middlewares/auth.middleware.js";
import HTTP from "../../utils/status.js";
import prisma from "../../configs/prisma.js";



const getBalance = async (req: authRequest, res: Response)=>{
    try {
        const userId = String(req.userId) as string;

        if(!userId){
            return res.status(HTTP.UNAUTHORIZED).json({
                error: "User is anauthorized to check balance."
            })
        }

        const data = await prisma.wallet.findUnique({
            where:{
                userId: userId
            }
        })

        if(!data){
            return res.status(HTTP.FORBIDDEN).json({
                error: "User doesn't have a wallet"
            })
        }

        return res.status(HTTP.SUCCESS).json({
            balance : data.amount
        })
    } catch (error) {
        return res.status(HTTP.INTERNAL_ERROR).json({
            error : "Internal Server Error."
        })
    }
}

export default getBalance;