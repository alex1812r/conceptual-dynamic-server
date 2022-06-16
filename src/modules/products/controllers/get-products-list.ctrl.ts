import { Request, Response } from "express";
import { FindManyOptions, IsNull, Like } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

type RequestQuery = {
  q?: string;
  skip?: string;
  take?: string;
}
export const getProductsList = async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
  const { q  = '', skip = 0, take = 20 } = req.query;

  const options: FindManyOptions<ProductEntity> = {
    where: [
      {
        name: Like(`%${q}%`),
        deletedAt: IsNull()
      }
    ],
    relations: {
      image: true
    },
    take: Number(take),
    skip: Number(skip),
  }

  const [productsList, count] = await Promise.all([
    ProductEntity.find(options),
    ProductEntity.count(options),
  ]);

  res.status(200).json({ productsList, count });
}