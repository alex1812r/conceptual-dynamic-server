import { Router } from 'express';
import { createNewOrder } from './controllers/create-new-order.ctrl';
import { deleteOrder } from './controllers/delete-client.ctrl';
import { getOrdersList } from './controllers/get-orders-list.ctrl';
import { getSingleOrder } from './controllers/get-single-order.ctrl';

export const orderstRouter = Router();

orderstRouter.get('/', getOrdersList);
orderstRouter.get('/:id', getSingleOrder);
orderstRouter.post('/', createNewOrder);
orderstRouter.delete('/:id', deleteOrder);