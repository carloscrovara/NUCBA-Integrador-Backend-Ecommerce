import { prisma } from '../config/prismaClient';

export const getOrdersAdmin = async () => {
    try {
        const orders = await prisma().orders.findMany({
            where: { 
                deletedAt: null, 
            },
            include: { 
                products: true 
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
            include: { 
                products: true 
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
            include: { 
                orders: true 
            },
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

export const createOrder = async (userId:string, productsIds:number[]) =>  {
    try {            
        const orderCreated = await prisma().orders.create({
            data: {
                userId: userId,
                products: {
                    create: productsIds.map((productId) => ({
                        product: {
                            connect: {
                                id: productId,
                            },
                        },
                    })),
                },
            }
        })
        return orderCreated;
    } catch (err){
        console.log(err)
        throw err
    }
}

export const updateOrder = async (orderId:string, userId:string, productsIds:number[]) =>  {
    try {            
        //condicional que comprueba si el id de order a modificar pertenece al usuario logueado
        const order = await getOrderById(orderId, userId);
        if (!order) {
            throw new Error("Not found the order or ID order belongs to another user.");
        } 
        const orderUpdated = await prisma().orders.update({
            where: {
                id: orderId,
            },
            data: {
                userId: userId,
                products: {
                    create: productsIds.map((productId) => ({
                        product: {
                            connect: {
                                id: productId,
                            },
                        },
                    })),
                },
            }
        })
        return orderUpdated;
    } catch (err){
        console.log(err)
        throw err
    }
}

export const deleteOrder = async (orderId:string, userId: string) => {
    try {
        //condicional que comprueba si el id de order a borrar pertenece al usuario logueado
        const order = await getOrderById(orderId, userId);
        if (!order) {
            throw new Error("Not found the order or ID order belongs to another user.");
        }     
        await prisma().orders.delete({ where: { id: orderId } });
        return;
    } catch (err){
        console.log(err);
        throw err;
    }
}