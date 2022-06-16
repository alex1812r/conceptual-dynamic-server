import { Request, Response } from "express";
import { FindManyOptions, IsNull } from "typeorm";
import { OrderEntity } from "../entities/order.entity";

type RequestQuery = {
  q?: string;
  skip?: string;
  take?: string;
}
export const getOrdersList = async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
  const { skip = 0, take = 20 } = req.query;  

  const options: FindManyOptions<OrderEntity> = {
    where: {
      deletedAt: IsNull()
    },
    relations: {
      client: true
    },
    take: Number(take),
    skip: Number(skip)
  } 

  const [ordersList, count] = await Promise.all([
    OrderEntity.find(options),
    OrderEntity.count(options)
  ])


  res.status(200).json({ ordersList, count });
}