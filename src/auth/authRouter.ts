import { Router } from "express";
import * as controllers from "./authControllers";
import { validator } from "../validators/validators";
import { body } from "express-validator";

export const authRouter = Router();

authRouter.post(
    "/register", 
    body("email").isString().notEmpty(),
    body("password").isString().notEmpty(),
    validator,
    controllers.registerController
);

authRouter.post(
    "/login",
    body("email").isString().notEmpty(),
    body("password").isString().notEmpty(),
    validator,
    controllers.loginController
);
    
authRouter.post("/refresh",controllers.refreshTokenController);