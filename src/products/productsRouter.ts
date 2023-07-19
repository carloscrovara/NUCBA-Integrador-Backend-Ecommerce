import { Router } from "express";
import { authAdminMiddleware, authMiddleware } from "../middlewares/authMiddlewares";
import { createProductController } from "./productsControllers";
import { validator } from "../validators/validators";
import { body } from "express-validator";

export const productsRouter = Router();

//Rutas que no requieren autenticacion ni autorizacion
//productsRouter.get('/list',);
//productsRouter.get('/:id',);

//Rutas que requieren autenticacion y autorizacion
productsRouter.use(authMiddleware, authAdminMiddleware);
productsRouter.post(
    '/create',
    body("name").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("image").isString().notEmpty(),
    body("price").isNumeric().notEmpty(),
    body("categoryId").isNumeric().notEmpty(),
    validator,
    createProductController
);
//productsRouter.put('/update/:id', nombreControlador);
//productsRouter.delete('/delete/:id', nombreControlador);