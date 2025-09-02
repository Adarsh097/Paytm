import type { Response } from "express";
import type { authRequest } from "../../middlewares/auth.middleware.js";
import prisma from "../../configs/prisma.js";
import utils from "../../utils/index.js";

const profileUpdate = async (req: authRequest, res: Response) => {
  try {
    const userId = req.userId;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: req.body,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(utils.HTTP.SUCCESS).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(utils.HTTP.INTERNAL_ERROR).json({
      error: "Internal server error: Profile update",
    });
  }
};
export default profileUpdate;
