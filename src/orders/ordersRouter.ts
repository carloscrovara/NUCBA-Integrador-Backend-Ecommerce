import { Router } from "express";
import { authAdminMiddleware, authMiddleware } from "../middlewares/authMiddlewares";
import { getOrdersAdminController, getOrderByIdAdminController, getOrdersController, getOrderByIdController, getOrdersDateRangeController, getOrdersDateRangeControllerAdmin, createOrderController, updateStatusOrderController, addProductsToOrderController, updateProductsFromOrderController, deleteProductsFromOrderController, deleteOrderController } from "./ordersControllers";
import { validator } from "../validators/validators";
import { body } from "express-validator";

export const ordersRouter = Router();

//Rutas que requieren autenticacion
ordersRouter.use(authMiddleware);
ordersRouter.get('/list', getOrdersController);
ordersRouter.get('/:id', getOrderByIdController);
ordersRouter.get('/daterange/:initialDate/:finalDate', getOrdersDateRangeController);
ordersRouter.post(
    '/create',
    body("productsIds").isArray({ min: 1}),
    body("quantity").isArray({ min: 1}),
    validator,
    createOrderController
);
ordersRouter.put(
    '/add/products/:id',
    body("productsIds").isArray({ min: 1}),
    body("quantity").isArray({ min: 1}),
    validator,
    addProductsToOrderController
)
ordersRouter.put(
    '/update/products/:id',
    body("productsIds").isArray({ min: 1}),
    body("quantity").isArray({ min: 1}),
    validator,
    updateProductsFromOrderController
)
ordersRouter.delete(
    '/delete/products/:id', 
    body("productsIds").isArray({ min: 1}),
    validator,
    deleteProductsFromOrderController);
ordersRouter.delete('/delete/:id', deleteOrderController);


//Rutas que requieren autenticacion y autorizacion de administrador
ordersRouter.use(authMiddleware, authAdminMiddleware);
ordersRouter.get('/admin/list', getOrdersAdminController);
ordersRouter.get('/admin/:id', getOrderByIdAdminController);
ordersRouter.get('/admin/daterange/:initialDate/:finalDate', getOrdersDateRangeControllerAdmin);
ordersRouter.put(
    '/admin/update/:id',
    body("status").isString().notEmpty(),
    validator,
    updateStatusOrderController);