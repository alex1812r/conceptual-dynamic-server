import { Router } from "express";
import { createNewProduct } from "./controllers/create-new-product.ctrl";
import { deleteProduct } from "./controllers/delete-product.ctrl";
import { getProductsList } from "./controllers/get-products-list.ctrl";
import { getSingleProduct } from "./controllers/get-single-product.ctrl";
import { updateProduct } from "./controllers/update-product.ctrl";

export const productsRouter = Router();

productsRouter.get('/', getProductsList);
productsRouter.get('/:id', getSingleProduct);
productsRouter.post('/', createNewProduct);
productsRouter.delete('/:id', deleteProduct);
productsRouter.put('/:id', updateProduct);