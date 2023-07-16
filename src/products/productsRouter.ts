import { Router } from "express";
import { authAdminMiddleware, authMiddleware } from "../middlewares/authMiddlewares";
import { createProductController } from "./productsControllers";

export const productsRouter = Router();

//Rutas que no requieren autenticacion ni autorizacion
//productsRouter.get('/getall',);
//productsRouter.get('/:id',);

//Rutas que requieren autenticacion y autorizacion
productsRouter.use(authMiddleware, authAdminMiddleware);
productsRouter.post('/create',createProductController);
//productsRouter.put('/update/:id',);
//productsRouter.delete('/delete/:id',);