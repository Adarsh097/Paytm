import express from "express";
import UserRouter from "./user.routes.js";

const V1Router = express.Router();

V1Router.use("/user",UserRouter);

export default V1Router;