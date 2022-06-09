import { Request, Response } from 'express';
import { ClientEntity } from '../entities/client-entity';

export const getClientsList = async (_req: Request, res: Response) => {
  const clientsList = await ClientEntity.find();
  res.status(200).json({ clientsList })
};