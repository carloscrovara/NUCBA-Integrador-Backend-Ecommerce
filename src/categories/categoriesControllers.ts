import { Request, Response } from "express";
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "./categoriesLogic";

export const getCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (err) {
        res.status(500).send(err);
        return;
    }
}

export const getCategoryByIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const convertIdToNumber = parseInt(id);
        const result = await getCategoryById(convertIdToNumber);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `Category: ${id} not found` });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createCategoryController = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const result = await createCategory(name);
        res.json(result);
        return;
    } catch (err) {
        res.status(500).send(err);
        return;
    }
}

export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const convertIdToNumber = parseInt(id);
        const { name } = req.body;
        const result = await updateCategory(convertIdToNumber, name);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `Category: ${id} not found` });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const convertIdToNumber = parseInt(id);
        await deleteCategory(convertIdToNumber);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};