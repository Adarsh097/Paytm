import type { Response } from "express";
import type { authRequest } from "../../middlewares/auth.middleware.js";
import HTTP from "../../utils/status.js";
import prisma from "../../configs/prisma.js";


const wallet = async(req:authRequest,res:Response)=>{
    try {
        const userId = req.userId as string;
        

        const {amount,phNumber} = req.body;

        if(!userId || !amount || !phNumber){
            return res.status(HTTP.BAD_REQUEST).json({
                error: "Missing required fields: userId, amount, phNumber"
            })
        }
        

        const existPhoneNumber = await prisma.phoneNumber.findUnique({
            where:{
                number: String(phNumber)
            }
        })
       
        if(existPhoneNumber){
            return res.status(HTTP.BAD_REQUEST).json({
                error: "Phone number already exists"
            })
        }
         

        const newPhoneNumber = await prisma.phoneNumber.create({
            data:{
                number: String(phNumber),
                userId: userId
            }
        })
        console.log("here2")


        const newWallet = await prisma.wallet.create({
            data:{
                amount: amount,
                userId: userId
            }
        })
        console.log("here2")


        return res.status(HTTP.SUCCESS).json({
            message: "Wallet created successful",
        })

        
    } catch (error) {
        return res.status(HTTP.INTERNAL_ERROR).json({
            error: "Internal server error: Wallet transaction"
        })
    }
}

export default wallet;