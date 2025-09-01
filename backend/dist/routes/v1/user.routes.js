import express from "express";
import controllers from "../../controllers/index.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validateUserMiddleware from "../../middlewares/user.validation.middleware.js";
const UserRouter = express.Router();
UserRouter.post("/signup", validateUserMiddleware, controllers.authControllers.registration);
UserRouter.post("/signin", validateUserMiddleware, controllers.authControllers.signin);
UserRouter.patch("/profile", authMiddleware, validateUserMiddleware, controllers.userControlllers.profileUpdate);
export default UserRouter;
//# sourceMappingURL=user.routes.js.map