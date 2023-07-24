import { Router } from "express";
import { authAdminMiddleware, authMiddleware } from "../middlewares/authMiddlewares";
import { createOrderController, getOrdersAdminController, getOrderByIdAdminController, getOrdersController, getOrderByIdController, updateOrderController, deleteOrderController } from "./ordersControllers";
import { validator } from "../validators/validators";
import { body } from "express-validator";

export const ordersRouter = Router();

//Rutas que requieren autenticacion
ordersRouter.use(authMiddleware);
ordersRouter.get('/list', getOrdersController);
ordersRouter.get('/:id', getOrderByIdController);
ordersRouter.post(
    '/create',
    body("productsIds").isArray({ min: 1}),
    validator,
    createOrderController
);
ordersRouter.put(
    '/update/:id',
    body("productsIds").isArray({ min: 1}),
    validator,
    updateOrderController
);
ordersRouter.delete('/delete/:id', deleteOrderController);

//Rutas que requieren autenticacion y autorizacion de administrador
ordersRouter.use(authMiddleware, authAdminMiddleware);
ordersRouter.get('/admin/list', getOrdersAdminController);
ordersRouter.get('/admin/:id', getOrderByIdAdminController);