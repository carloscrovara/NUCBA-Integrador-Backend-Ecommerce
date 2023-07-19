import { Request, Response } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./productsLogic";

export const getProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
        return;
    }
}

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const convertIdToNumber = parseInt(id);
        const result = await getProductById(convertIdToNumber);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `Product: ${id} not found` });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

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

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const convertIdToNumber = parseInt(id);
        const { name, description, image, price, categoryId } = req.body;
        const result = await updateProduct(convertIdToNumber, name, description, image, price, categoryId);
        if (result) {
            res.json(result);
            return;
        }
        res.status(404).json({ message: `Product: ${id} not found` });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const convertIdToNumber = parseInt(id);
        await deleteProduct(convertIdToNumber);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};