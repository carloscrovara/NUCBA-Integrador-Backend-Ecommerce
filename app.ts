import express from 'express';
import { getConfig } from './src/config/config';
import { createPrismaClient } from './src/config/prismaClient';
import { authRouter } from './src/auth/authRouter';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth', authRouter)
//Otra ruta

const server = app.listen(port, () =>{
    createPrismaClient();
    getConfig();
    console.log(`App listening on port ${port}`)
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;