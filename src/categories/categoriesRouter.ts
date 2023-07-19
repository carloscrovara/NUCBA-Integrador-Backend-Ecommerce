import { Router } from "express";
import { authAdminMiddleware, authMiddleware } from "../middlewares/authMiddlewares";
import { getCategoriesController, getCategoryByIdController, createCategoryController, updateCategoryController, deleteCategoryController } from "./categoriesControllers";
import { validator } from "../validators/validators";
import { body } from "express-validator";

export const categoriesRouter = Router();

//Rutas que no requieren autenticacion ni autorizacion
categoriesRouter.get('/list', getCategoriesController);
categoriesRouter.get('/:id', getCategoryByIdController);

//Rutas que requieren autenticacion y autorizacion
categoriesRouter.use(authMiddleware, authAdminMiddleware);
categoriesRouter.post(
    '/create',
    body("name").isString().notEmpty(),
    validator,
    createCategoryController
);
categoriesRouter.put(
    '/update/:id', 
    body("name").isString().notEmpty(),
    validator,
    updateCategoryController
);
categoriesRouter.delete('/delete/:id', deleteCategoryController);