import { Router } from "express";
import { authAdminMiddleware, authMiddleware } from "../middlewares/authMiddlewares";
import { createCategoryController } from "./categoriesControllers";
import { validator } from "../validators/validators";
import { body } from "express-validator";

export const categoriesRouter = Router();

//Rutas que no requieren autenticacion ni autorizacion
//categoriesRouter.get('/list',);
//categoriesRouter.get('/:id',);

//Rutas que requieren autenticacion y autorizacion
categoriesRouter.use(authMiddleware, authAdminMiddleware);
categoriesRouter.post(
    '/create',
    body("name").isString().notEmpty(),
    validator,
    createCategoryController
);
//categoriesRouter.put('/update/:id',);
//categoriesRouter.delete('/delete/:id',);