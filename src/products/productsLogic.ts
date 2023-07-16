import { prisma } from '../config/prismaClient';

export const createProduct = async (name:string, description:string, image:string, price:number, categoryId:number) => {
    try {
        const productCreated = await prisma().products.create({
            data:{
                name: name,
                description: description,
                image: image,
                price: price,
                categoryId: categoryId
            }
        })
        return productCreated;
    } catch (err){
        console.log(err)
        throw err
    }
}