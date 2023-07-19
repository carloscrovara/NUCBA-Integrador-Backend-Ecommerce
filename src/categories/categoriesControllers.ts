import { Request, Response } from "express";
import { createCategory } from "./categoriesLogic";

export const createCategoryController = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const result = await createCategory(name)
        res.json(result)
        return
    } catch (err) {
        res.status(500).send(err)
        return
    }
}