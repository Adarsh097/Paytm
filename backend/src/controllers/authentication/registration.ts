import type { Request, Response } from "express";
import prisma from "../../configs/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../../configs/env.js";
import utils from "../../utils/index.js";

const registrationController = async (req: Request, res: Response) => {
  try {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password){
         res.status(utils.HTTP.BAD_REQUEST).json({
            error: "All fields are required" 
        })
        return;
    }
    //! user already exists
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if(existingUser){
        res.status(utils.HTTP.BAD_REQUEST).json({
            error: "User already exists"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await prisma.user.create({
        data:{
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })

    const token =  jwt.sign(
        {userId: newUser.id},
        ENV.JWT_SECRET as string,
        {expiresIn: "1h"}
    )

    res.cookie("token", token,{
        httpOnly: true,
        secure: ENV.NODE_ENV === "production", // set to true in production
        sameSite: "strict",
        maxAge: 3600000 // 1 hour
    })

    return res.status(utils.HTTP.CREATED).json({
        message: "User registered successfully",
        token
        
    })
  } catch (error) {
    res.status(utils.HTTP.INTERNAL_ERROR).json({
        error: "Internal server error: Registration"
    })
    
  }
};

export default registrationController;
