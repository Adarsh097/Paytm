import express from "express";
import UserRouter from "./user.routes.js";
import TransactionRouter from "./transaction.routes.js";
const V1Router = express.Router();
V1Router.use("/user", UserRouter);
V1Router.use("/money", TransactionRouter);
export default V1Router;
//# sourceMappingURL=index.js.map