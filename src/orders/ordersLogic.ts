import { prisma } from '../config/prismaClient';

export const getOrdersAdmin = async () => {
    try {
        const orders = await prisma().orders.findMany({
            where: { 
                deletedAt: null, 
            },   
        })
        return orders;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getOrderByIdAdmin = async (id:string) => {
    try {
        const order = await prisma().orders.findUnique({
            where:{
                id: id,
            }
        })
        return order;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getOrders = async (userId:string) => {
    try {
        const orders = await prisma().orders.findMany({
            where: { 
                user: {
                    id: userId
                }, 
                deletedAt: null, 
            },   
        })
        return orders;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getOrderById = async (orderId: string, userId:string) => {
    try {
        const usuarios = await prisma().users.findUnique({
            where: {
                id: userId,
            },
            include: { orders: true },
        });
        if (!usuarios) {
            return null;
        }
        return usuarios.orders.find((i) => i.id === orderId) ?? null;
    } catch (err) { 
        console.log(err);
        throw err;
    }
}

export const createOrder = async (userId:string, productsIds: number) => {
    try {        
        // Fetch products based on the provided IDs
        /*const products = await prisma().products.findMany({
            where: {
                id: {
                    in: productsIds,
                }
            }
        })
        */

        const orderCreated = await prisma().orders.create({
            data: {
                userId: userId,
                //Connect with one product id
                products: {
                    create: [
                        {
                            product: {
                                connect: {
                                    id: productsIds,
                                },
                            },
                        },
                    ],
                },
            }
        })
        return orderCreated;
    } catch (err){
        console.log(err)
        throw err
    }
}