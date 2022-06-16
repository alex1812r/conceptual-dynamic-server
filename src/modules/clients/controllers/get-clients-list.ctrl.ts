import { Request, Response } from 'express';
import { FindManyOptions, IsNull, Like,  } from 'typeorm';
import { ClientEntity } from '../entities/client-entity';

type RequestQuery = {
  q?: string;
  skip?: string;
  take?: string;
}
export const getClientsList = async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
  const { q = '', skip = 0, take = 20 } = req.query;  

  const options: FindManyOptions<ClientEntity> = {
    where: [
      { 
        name: Like(`%${q}%`),
        deletedAt: IsNull()
      },
      { 
        lastname: Like(`%${q}%`),
        deletedAt: IsNull()
      },
      { 
        dni: `%${q}%`,
        deletedAt: IsNull()
      },
    ],
    take: Number(take),
    skip: Number(skip),
  }
  
  const [clientsList, count] = await Promise.all([
    ClientEntity.find(options),
    ClientEntity.count(options)
  ])

  res.status(200).json({ clientsList, count })
};