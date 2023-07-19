import { prisma } from '../config/prismaClient';

export const getCategories = async () => {
    try {
        const categories = await prisma().categories.findMany({
            where: { 
                deletedAt: null, 
            },   
        })
        return categories;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getCategoryById = async (id:number) => {
    try {
        const category = await prisma().categories.findUnique({
            where:{
                id: id,
            }
        })
        return category;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createCategory = async (name:string) => {
    try {
        const categoryCreated = await prisma().categories.create({
            data:{
                name: name,
            }
        })
        return categoryCreated;
    } catch (err){
        console.log(err);
        throw err;
    }
}

export const updateCategory = async (id:number, name:string) => {
    try {
        const categoryUpdated = await prisma().categories.update({
            where:{
                id: id,
            },
            data:{
                name: name,
            }
        })
        return categoryUpdated;
    } catch (err){
        console.log(err);
        throw err;
    }
}

export const deleteCategory = async (id:number) => {
    try {
        const categoryDeleted = await prisma().categories.delete({
            where:{
                id: id,
            }
        })
        return categoryDeleted;
    } catch (err){
        console.log(err);
        throw err;
    }
}