import { Router } from "express";
import { getProductsList } from "./controllers/get-products-list.ctrl";
import { getSingleProduct } from "./controllers/get-single-product.ctrl";

export const productsRouter = Router();

productsRouter.get('/', getProductsList);
productsRouter.get('/:id', getSingleProduct);