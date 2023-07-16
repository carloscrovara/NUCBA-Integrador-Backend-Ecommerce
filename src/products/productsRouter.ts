import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddlewares";
import { createProductController } from "./productsControllers";

export const productsRouter = Router();

productsRouter.use(authMiddleware);
productsRouter.post('/create',createProductController);
//productsRouter.get('',);