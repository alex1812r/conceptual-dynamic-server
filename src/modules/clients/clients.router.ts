import { Router } from 'express';
import { createNewClient } from './controllers/create-new-client.ctrl';
import { getClientsList } from './controllers/get-clients-list.ctrl';
import { getSingleClient } from './controllers/get-single-client.ctrl';

export const clienstRouter = Router();

clienstRouter.get('/', getClientsList);
clienstRouter.get('/:id', getSingleClient);
clienstRouter.post('/', createNewClient);