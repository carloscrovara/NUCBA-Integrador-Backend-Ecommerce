import express , {Request, Response} from 'express';
import { getConfig } from './src/config/config';
import { createPrismaClient } from './src/config/prismaClient';
import { authRouter } from './src/auth/authRouter';
import { productsRouter } from './src/products/productsRouter';
import { categoriesRouter } from './src/categories/categoriesRouter';
import { ordersRouter } from './src/orders/ordersRouter';
import { html } from './src/inicioMsje';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

//Rutas
app.get("/", (req: Request, res: Response) => res.type('html').send(html));
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);

const server = app.listen(port, () =>{
    createPrismaClient();
    getConfig();
    console.log(`App listening on port ${port}`)
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;