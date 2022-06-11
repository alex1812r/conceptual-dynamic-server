import { Router } from "express";
import { clienstRouter } from "../modules/clients/clients.router";
import { orderstRouter } from "../modules/orders/orders.router";
import { productsRouter } from "../modules/products/products.router";

export const apiRouter = Router();

apiRouter.use('/clients', clienstRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/orders', orderstRouter);