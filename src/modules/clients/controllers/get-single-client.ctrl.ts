import { Request, Response } from "express";
import { ClientEntity } from "../entities/client-entity";

type SingleClientParams = { 
  id: string
}
export const getSingleClient = async (req: Request<SingleClientParams>, res: Response) => {

  const client = await ClientEntity.findOne({
    where: { id: Number(req.params.id) },
    relations: {
      orders: true
    }
  })
  
  res.status(200).json({ client });
};