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

type filterInput = {dateRange:{start: Date, end: Date}};

export const getOrdersDateRange = async (userId:string, filterInput: filterInput) => {
    try {
        const filter: any = {
            userId: userId,
            deletedAt: null,
        }
        if(filterInput.dateRange){
            filter.createdAt = {
                gte: filterInput.dateRange.start,
                lte: filterInput.dateRange.end,
            }
        }
        const result = await prisma().orders.findMany({
            where: filter,
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const getOrdersDateRangeAdmin = async (filterInput: filterInput) => {
    try {
        const filter: any = {
            deletedAt: null,
        }
        if(filterInput.dateRange){
            filter.createdAt = {
                gte: filterInput.dateRange.start,
                lte: filterInput.dateRange.end,
            }
        }
        const result = await prisma().orders.findMany({
            where: filter,
        });
        return result;
    } catch (err) {
        throw err;
    }
}

export const createOrder = async (userId:string, productsIds:number[], quantity:number[]) =>  {
    try {            
        const orderCreated = await prisma().orders.create({
            data: {
                userId: userId,
            }
        })

        await prisma().ordersAndProducts.createMany({
            data: productsIds.map((productId, index) => ({
                orderId: orderCreated.id,
                productId: productId,
                quantity: quantity[index],
            })),
        })

        const newOrder = await prisma().orders.findUnique({
            where: { 
                id: orderCreated.id,
                deletedAt: null, 
            },
            include: { 
                products: true 
            },    
        })

        return newOrder;
    } catch (err){
        console.log(err)
        throw err
    }
}

export const updateStatusOrderAdmin = async (orderId:string, status: string) =>  {
    try {                    
        const orderUpdated = await prisma().orders.update({
            where: {
                id: orderId,
            },
            data: {
                status: status,
            }
        })

        const orderResult = await prisma().orders.findUnique({
            where: { 
                id: orderUpdated.id,
                deletedAt: null, 
            },
            include: { 
                products: true 
            },    
        })

        return orderResult;
    } catch (err){
        console.log(err)
        throw err
    }
}

export const addProductsToOrder = async (orderId:string, userId:string, productsIds:number[], quantity:number[]) =>  {
    try {            
        //condicional que comprueba si el id de order a modificar pertenece al usuario logueado
        const order = await getOrderById(orderId, userId);
        if (!order) {
            throw new Error("Not found the order or ID order belongs to another user.");
        } 

        await prisma().orders.update({
            where: {
                id: orderId,
            },
            data: {
                updatedAt: new Date(),
            }
        })

        await prisma().ordersAndProducts.createMany({
            data: productsIds.map((productId, index) => ({
                orderId: orderId,
                productId: productId,
                quantity: quantity[index],
            })),
        })

        const orderResult = await prisma().orders.findUnique({
            where: { 
                id: orderId,
                deletedAt: null, 
            },
            include: { 
                products: true 
            },    
        })
        
        return orderResult;
    } catch (err){
        console.log(err)
        throw err
    }
}

export const updateProductsFromOrder = async (orderId:string, userId:string, productsIds:number[], quantity:number[]) => {
    try {            
        //condicional que comprueba si el id de order a modificar pertenece al usuario logueado
        const order = await getOrderById(orderId, userId);
        if (!order) {
            throw new Error("Not found the order or ID order belongs to another user.");
        } 

        await prisma().orders.update({
            where: {
                id: orderId,
            },
            data: {
                updatedAt: new Date(),
            }
        })

        await prisma().ordersAndProducts.deleteMany({
            where: {
                orderId: orderId,
                productId: {
                    in: productsIds,
                },
            }
        })
        
        await prisma().ordersAndProducts.createMany({
            data: productsIds.map((productId, index) => ({
                orderId: orderId,
                productId: productId,
                quantity: quantity[index],
            })),
        })

        const orderResult = await prisma().orders.findUnique({
            where: { 
                id: orderId,
                deletedAt: null, 
            },
            include: { 
                products: true 
            },    
        })

        return orderResult;
    } catch (err){
        console.log(err);
        throw err;
    }
}

export const deleteProductsFromOrder = async (orderId:string, userId:string, productsIds:number[]) =>  {
    try {
        //condicional que comprueba si el id de order a modificar pertenece al usuario logueado
        const order = await getOrderById(orderId, userId);
        if (!order) {
            throw new Error("Not found the order or ID order belongs to another user.");
        }
        await prisma().orders.update({
            where: {
                id: orderId,
            },
            data: {
                updatedAt: new Date(),
            }
        })

        await prisma().ordersAndProducts.deleteMany({
            where: {
                orderId: orderId,
                productId: {
                    in: productsIds,
                },
            }
        })
        return;
    } catch (err){
        console.log(err);
        throw err;
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

        await prisma().ordersAndProducts.deleteMany({
            where: {
                orderId: orderId,
            }
        });
        return;
    } catch (err){
        console.log(err);
        throw err;
    }
}