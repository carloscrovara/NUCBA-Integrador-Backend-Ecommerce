import { Request, Response } from "express";
import { createOrder, getOrdersAdmin, getOrderByIdAdmin, getOrders, getOrderById } from "./ordersLogic";

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

export const createOrderController = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const { productsIds } = req.body;
    try {
        const result = await createOrder(userId, productsIds)
        res.json(result);
        return;
    } catch (err) {
        res.status(500).send(err);
        return;
    }
}