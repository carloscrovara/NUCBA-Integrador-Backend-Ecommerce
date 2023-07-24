import { Router } from "express";
import { authAdminMiddleware, authMiddleware } from "../middlewares/authMiddlewares";
import { createOrderController, getOrdersAdminController, getOrderByIdAdminController, getOrdersController, getOrderByIdController } from "./ordersControllers";
import { validator } from "../validators/validators";
import { body } from "express-validator";

export const ordersRouter = Router();

//Rutas que requieren autenticacion
ordersRouter.use(authMiddleware);
ordersRouter.get('/list', getOrdersController);
ordersRouter.get('/:id', getOrderByIdController);

//Rutas que requieren autenticacion
ordersRouter.use(authMiddleware);
ordersRouter.post(
    '/create',
    //body("productsIds").notEmpty(),
    //validator,
    createOrderController
);

//Rutas que requieren autenticacion y autorizacion de administrador
ordersRouter.use(authMiddleware, authAdminMiddleware);
ordersRouter.get('/admin/list', getOrdersAdminController);
ordersRouter.get('/admin/:id', getOrderByIdAdminController);