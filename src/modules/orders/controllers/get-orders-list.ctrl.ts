import { Request, Response } from "express";
import { OrderEntity } from "../entities/order.entity";

export const getOrdersList = async (req: Request, res: Response) => {
  const ordersList = await OrderEntity.find({
    relations: {
      client: true
    }
  });
  res.status(200).json({ ordersList });
}