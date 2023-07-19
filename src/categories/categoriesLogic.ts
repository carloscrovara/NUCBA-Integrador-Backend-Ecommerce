import { prisma } from '../config/prismaClient';

export const createCategory = async (name:string) => {
    try {
        const categoryCreated = await prisma().categories.create({
            data:{
                name: name,
            }
        })
        return categoryCreated;
    } catch (err){
        console.log(err)
        throw err
    }
}