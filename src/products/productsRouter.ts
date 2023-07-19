import { Router } from "express";
import { authAdminMiddleware, authMiddleware } from "../middlewares/authMiddlewares";
import { createProductController, getProductsController, getProductByIdController, deleteProductController, updateProductController } from "./productsControllers";
import { validator } from "../validators/validators";
import { body } from "express-validator";

export const productsRouter = Router();

//Rutas que no requieren autenticacion ni autorizacion
productsRouter.get('/list', getProductsController);
productsRouter.get('/:id', getProductByIdController);

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
productsRouter.put(
    '/update/:id', 
    body("name").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("image").isString().notEmpty(),
    body("price").isNumeric().notEmpty(),
    body("categoryId").isNumeric().notEmpty(),
    validator,
    updateProductController);
productsRouter.delete('/delete/:id', deleteProductController);