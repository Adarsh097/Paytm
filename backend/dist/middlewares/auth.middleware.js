import jwt from "jsonwebtoken";
import ENV from "../configs/env.js";
import utils from "../utils/index.js";
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;
        if (!token) {
            res.status(utils.HTTP.UNAUTHORIZED).json({
                error: "Unauthorized"
            });
            return;
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(utils.HTTP.INTERNAL_ERROR).json({
            error: "Internal server error"
        });
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map