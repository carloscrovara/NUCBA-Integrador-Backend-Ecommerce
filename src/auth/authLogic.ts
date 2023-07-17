import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prismaClient';
import { getConfig } from '../config/config';

export type loginResponse = {accessToken:string, refreshToken:string}

export const login = async (email: string, password: string): Promise<loginResponse> =>{ 
    try {
        const user = await prisma().users.findUnique({ where: { email: email } });
        if (user === null) {
            throw new Error("User not found");
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const accessToken = jwt.sign(
                { email: email, userId: user.id, role: user.roleId },
                getConfig().accesTokenSecret,
                {
                    expiresIn: "1h",
                }
            );
            const refreshToken = jwt.sign({ email: email }, getConfig().refreshTokenSecret, {
                expiresIn: "72h",
            });
            return { accessToken: accessToken, refreshToken: refreshToken };
        }
        throw new Error("Invalid password");
        } catch (err) {
            throw err;
        }
}

export const register = async (email: string, password: string): Promise<any> => {
    const hash = await bcrypt.hash(password, 10);
    try {
        const user = await prisma().users.create({
            data: {
                email: email,
                password: hash,
            },
        });
        return user
    } catch (err) {
        throw err
    }
}

export const refreshToken = async (token: string): Promise<loginResponse> => {
    try {
        const data = jwt.verify(token, getConfig().refreshTokenSecret);
        if (data) {
            const dataparsed = data as unknown as {email:string};
            const user = await prisma().users.findUnique({
                where: { email: dataparsed.email },
            });
            if (user === null) {
                throw new Error('USER NOT FOUND')
            }
            const accessToken = jwt.sign(
                { email: user.email },
                getConfig().accesTokenSecret,
                {
                expiresIn: "1h",
                }
            );
            const refreshToken = jwt.sign({ email: user.email }, getConfig().refreshTokenSecret, {
                expiresIn: "72h",
            });
            return { accessToken: accessToken, refreshToken: refreshToken };
        }
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            throw new Error( "NOT AUTHORIZED: TOKEN EXPIRED" );
        }
        throw new Error("NOT AUTHORIZED: TOKEN NOT VALID" );
    }
    throw new Error( "NOT AUTHORIZED: TOKEN NOT VALID" );
}