import { Request, Response } from 'express';
import { Like,  } from 'typeorm';
import { ClientEntity } from '../entities/client-entity';

type RequestQuery = {
  q?: string;
}
export const getClientsList = async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
  const { q = '' } = req.query;  

  const clientsList = await ClientEntity.find({
    where: [
      { name: Like(`%${q}%`) },
      { lastname: Like(`%${q}%`) },
      { dni: `%${q}%` }
    ]
  });
  res.status(200).json({ clientsList })
};