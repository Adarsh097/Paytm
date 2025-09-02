import type { Response } from "express";
import type { authRequest } from "../../middlewares/auth.middleware.js";
import HTTP from "../../utils/status.js";
import prisma from "../../configs/prisma.js";


const findUser = async (req: authRequest, res: Response)=>{
    try {
        const currentUserId = req.userId as string;

        if(!currentUserId){
            return res.status(HTTP.UNAUTHORIZED).json({
                error: "You are unauthorised"
            })
        }

        const {phNumber} = req.body;

        const recipient = await prisma.phoneNumber.findUnique({
            where: {
                number: String(phNumber)
            },
            select: {
                user : {
                    select:{
                        firstName: true,
                        lastName: true,
                        id: true,
                        
                    }
                }
            }
        })
        if(!recipient){
            return res.status(HTTP.NOT_FOUND).json({
                error: "Recipient not found."
            })
        }

        return res.status(HTTP.SUCCESS).json({
            message: "Recipient found successfully",
            data: recipient
        })
        
    } catch (error) {
        return res.status(HTTP.INTERNAL_ERROR).json({
            error: "Internal server error"
        })
    }
}

export default findUser;