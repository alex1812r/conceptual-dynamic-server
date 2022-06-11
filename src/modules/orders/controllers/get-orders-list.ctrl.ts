import { Request, Response } from "express";
import { IsNull } from "typeorm";
import { OrderEntity } from "../entities/order.entity";

export const getOrdersList = async (req: Request, res: Response) => {
  const ordersList = await OrderEntity.find({
    where: {
      deletedAt: IsNull()
    },
    relations: {
      client: true
    }
  });
  res.status(200).json({ ordersList });
}