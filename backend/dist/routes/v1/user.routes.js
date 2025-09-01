import express from "express";
import controllers from "../../controllers/index.js";
const UserRouter = express.Router();
UserRouter.post("/signup", controllers.authControllers.registration);
UserRouter.post("/signin", controllers.authControllers.signin);
export default UserRouter;
//# sourceMappingURL=user.routes.js.map