import { Request, Response } from "express";
import { ClientEntity } from "../entities/client-entity";

type RequetParams = {
  id: string;
}

export const deleteClient = async (req: Request<RequetParams>, res: Response) => {

  await ClientEntity.update(
    { id: Number(req.params.id) },
    { deletedAt: new Date() }
  )

  res.status(200).json({ success: true })
};