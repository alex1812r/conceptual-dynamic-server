import { Router } from "express";
import { clienstRouter } from "../modules/clients/clients.router";
import { productsRouter } from "../modules/products/products.router";

export const apiRouter = Router();

apiRouter.use('/clients', clienstRouter);
apiRouter.use('/products', productsRouter);