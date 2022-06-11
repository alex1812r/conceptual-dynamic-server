import { Request, Response } from "express";
import { IsNull, Like } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

type RequestQuery = {
  q?: string;
}
export const getProductsList = async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
  const { q  = ''} = req.query;
  const productsList = await ProductEntity.find({
    where: [
      {
        name: Like(`%${q}%`),
        deletedAt: IsNull()
      }
    ]
  });
  res.status(200).json({ productsList });
}