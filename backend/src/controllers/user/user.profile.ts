import type { Response } from "express";
import type { authRequest } from "../../middlewares/auth.middleware.js";
import prisma from "../../configs/prisma.js";

const profileUpdate = async(req:authRequest, res: Response)=>{
    try {
        const userId = req.userId;

        const updatedUser = await prisma.user.update({
            where: {
                id: userId as string
            },
            data: req.body,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }  
        });

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            
        })
    } catch (error) {
     return res.status(500).json({
        error: "Internal server error: Profile update"
     })   
    }
}
export default profileUpdate;