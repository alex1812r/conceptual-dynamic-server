import { Request, Response } from "express";
import { OrderEntity } from "../entities/order.entity";

type RequestParams = {
  id: string
}
export const getSingleOrder = async (req: Request<RequestParams>, res: Response) => {

  const order = await OrderEntity.findOne({
    where: { id: Number(req.params.id) },
    relations: {
      client: true,
      orderProducts: {
        product: true
      }
    }
  });

  res.status(200).json({ order });
}