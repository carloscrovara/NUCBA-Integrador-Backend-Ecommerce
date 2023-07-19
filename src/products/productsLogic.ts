import { prisma } from '../config/prismaClient';

export const getProducts = async () => {
    try {
        const products = await prisma().products.findMany({
            where: { 
                deletedAt: null, 
            },   
        })
        return products;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getProductById = async (id:number) => {
    try {
        const product = await prisma().products.findUnique({
            where:{
                id: id,
            }
        })
        return product;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createProduct = async (name:string, description:string, image:string, price:number, categoryId:number) => {
    try {
        const productCreated = await prisma().products.create({
            data:{
                name: name,
                description: description,
                image: image,
                price: price,
                categoryId: categoryId,
            }
        })
        return productCreated;
    } catch (err){
        console.log(err)
        throw err
    }
}

export const updateProduct = async (id:number, name:string, description:string, image:string, price:number, categoryId:number) => {
    try {
        const productUpdated = await prisma().products.update({
            where:{
                id: id,
            },
            data:{
                name: name,
                description: description,
                image: image,
                price: price,
                categoryId: categoryId,
            }
        })
        return productUpdated;
    } catch (err){
        console.log(err);
        throw err;
    }
}

export const deleteProduct = async (id:number) => {
    try {
        const productDeleted = await prisma().products.delete({
            where:{
                id: id,
            }
        })
        return productDeleted;
    } catch (err){
        console.log(err);
        throw err;
    }
}