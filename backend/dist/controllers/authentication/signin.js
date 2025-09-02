import prisma from "../../configs/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../../configs/env.js";
import utils from "../../utils/index.js";
const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(utils.HTTP.BAD_REQUEST).json({
                error: "All fields are required",
            });
            return;
        }
        const userData = await prisma.user.findUnique({
            where: { email },
        });
        if (!userData) {
            res.status(utils.HTTP.NOT_FOUND).json({
                error: "Invalid email or password",
            });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            res.status(utils.HTTP.UNAUTHORIZED).json({
                error: "Invalid email or password",
            });
            return;
        }
        const secret = ENV.JWT_SECRET;
        const token = jwt.sign({
            userId: userData?.id,
        }, secret, { expiresIn: "1h" });
        //! also include the token in httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: ENV.NODE_ENV === "production", // set to true in production
            sameSite: "strict",
            maxAge: 3600000 // 1 hour
        });
        return res.status(utils.HTTP.SUCCESS).json({
            message: "Signin successful",
            token: token
        });
    }
    catch (error) {
        return res.status(utils.HTTP.INTERNAL_ERROR).json({
            error: "Internal server error: Signin",
        });
    }
};
export default signinController;
//# sourceMappingURL=signin.js.map