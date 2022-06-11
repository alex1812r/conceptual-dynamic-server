import { Router } from 'express';
import { createNewClient } from './controllers/create-new-client.ctrl';
import { deleteClient } from './controllers/delete-client.ctrl';
import { getClientsList } from './controllers/get-clients-list.ctrl';
import { getSingleClient } from './controllers/get-single-client.ctrl';
import { updateClient } from './controllers/update-client.ctrl';

export const clienstRouter = Router();

clienstRouter.get('/', getClientsList);
clienstRouter.get('/:id', getSingleClient);
clienstRouter.post('/', createNewClient);
clienstRouter.put('/:id', updateClient);
clienstRouter.delete('/:id', deleteClient);