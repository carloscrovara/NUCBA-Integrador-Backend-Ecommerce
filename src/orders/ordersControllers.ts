import { Request, Response } from "express";
import { getOrdersAdmin, getOrderByIdAdmin, getOrders, getOrderById, getOrdersDateRange, getOrdersDateRangeAdmin, createOrder, updateStatusOrderAdmin, addProductsToOrder, updateProductsFromOrder, deleteProductsFromOrder, deleteOrder } from "./ordersLogic";

export const getOrdersAdminController = async (req: Request, res: Response) => {
    try {
        const orders = await getOrdersAdmin();
        res.json(orders);
    } catch (err) {
        res.status(500).send(err);
        return;
    }
}

export const getOrderByIdAdminController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await getOrderByIdAdmin(id);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `Order: ${id} not found` });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrdersController = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    try {
        const orders = await getOrders(userId);
        res.json(orders);
    } catch (err) {
        res.status(500).send(err);
        return;
    }
}

export const getOrderByIdController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const userId = res.locals.userId;
        const result = await getOrderById(orderId, userId);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `Order: ${orderId} not found` });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrdersDateRangeController = async (req: Request, res: Response) => {
    try {
        const fechaInicial = req.params.initialDate;
        const fechaFin  = req.params.finalDate;
        const userId = res.locals.userId;
        const filterInput = {
            dateRange: {
                start: new Date(fechaInicial),
                end: new Date(fechaFin),
            },
        }
        const result = await getOrdersDateRange(userId, filterInput);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `No records found.` });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrdersDateRangeControllerAdmin = async (req: Request, res: Response) => {
    try {
        const fechaInicial = req.params.initialDate;
        const fechaFin  = req.params.finalDate;
        const filterInput = {
            dateRange: {
                start: new Date(fechaInicial),
                end: new Date(fechaFin),
            },
        }
        const result = await getOrdersDateRangeAdmin(filterInput);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `No records found.` });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createOrderController = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const { productsIds, quantity } = req.body;
    try {
        const result = await createOrder(userId, productsIds, quantity)
        res.json(result);
        return;
    } catch (err) {
        res.status(500).send(err);
        return;
    }
}

export const updateStatusOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const result = await updateStatusOrderAdmin (orderId, status);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const addProductsToOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const userId = res.locals.userId;
        const { productsIds, quantity } = req.body;
        const result = await addProductsToOrder(orderId, userId, productsIds, quantity);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProductsFromOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const userId = res.locals.userId;
        const { productsIds, quantity } = req.body;
        const result = await updateProductsFromOrder(orderId, userId, productsIds, quantity);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProductsFromOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const userId = res.locals.userId;
        const { productsIds } = req.body;
        const result = await deleteProductsFromOrder(orderId, userId, productsIds);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrderController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const userId = res.locals.userId;
        await deleteOrder(orderId, userId);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};