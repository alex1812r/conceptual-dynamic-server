import { Request, Response } from "express";
import { OrderEntity } from "../entities/order.entity";

type RequetParams = {
  id: string;
}

export const deleteOrder = async (req: Request<RequetParams>, res: Response) => {

  await OrderEntity.update(
    { id: Number(req.params.id) },
    { deletedAt: new Date() }
  )

  res.status(200).json({ success: true })
};