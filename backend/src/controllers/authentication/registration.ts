import type { Request, Response } from "express";
import prisma from "../../configs/prisma.js";
import bcrypt from "bcrypt";

const registrationController = async (req: Request, res: Response) => {
  try {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password){
         res.status(400).json({
            error: "All fields are required" 
        })
        return;
    }
    //! user already exists
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if(existingUser){
        res.status(409).json({
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

    return res.status(201).json({
        message: "User registered successfully",
        data: {
            userId : newUser.id
        }
    })
  } catch (error) {
    res.status(500).json({
        error: "Internal server error: Registration"
    })
    
  }
};

export default registrationController;
