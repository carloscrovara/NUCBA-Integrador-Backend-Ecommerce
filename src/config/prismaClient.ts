import { Prisma, PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never
> | null;

export function createPrismaClient() {
    prismaClient = new PrismaClient();
    prismaClient.$use(async (params:any, next:any) => {
        if (params.action == "delete") {
            params.action = "update";
            params.args["data"] = { deletedAt: new Date() };
        }
        return next(params);
    });
    return prismaClient;
}

export function prisma() {
    if (!prismaClient) {
        prismaClient = createPrismaClient();
    }
    return prismaClient;
}