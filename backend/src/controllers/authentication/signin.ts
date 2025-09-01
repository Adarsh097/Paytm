import type { Request, Response } from "express";
import prisma from "../../configs/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../../configs/env.js";

const signinController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        error: "All fields are required",
      });
      return;
    }

    const userData = await prisma.user.findUnique({
      where: { email },
    });


    if (!userData) {
      res.status(404).json({
        error: "Invalid email or password",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);


    if (!isPasswordValid) {
      res.status(401).json({
        error: "Invalid email or password",
      });
      return;
    }

    const secret = ENV.JWT_SECRET as string;


    const token = jwt.sign(
      {
        userId: userData?.id,
      },
      secret,
      { expiresIn: "1h" }
    );

    //! also include the token in httpOnly cookie
    res.cookie("token", token,{
        httpOnly: true,
        secure: ENV.NODE_ENV === "production", // set to true in production
        sameSite: "strict",
        maxAge: 3600000 // 1 hour
    })
 

    return res.status(200).json({
      message: "Signin successful",
      token: token
    })
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error: Signin",
    });
  }
};
export default signinController;
