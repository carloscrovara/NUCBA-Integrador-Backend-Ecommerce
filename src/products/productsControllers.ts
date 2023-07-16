import { Request, Response } from "express";
import { createProduct } from "./productsLogic";

export const createProductController = async (req: Request, res: Response) => {
    const { name, description, image, price, categoryId } = req.body;

    try {
        const result = await createProduct(name, description, image, price, categoryId)
        res.json(result)
    return
    } catch (err) {
        res.status(500).send(err)
        return
    }
}