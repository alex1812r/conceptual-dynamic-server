import { Request, Response } from "express";
import { ProductEntity } from "../entities/product.entity";

type RequestParams = {
  id: string;
}
export const getSingleProduct = async (req: Request<RequestParams>, res: Response) => {
  const product = await ProductEntity.findOne({
    where: { id: Number(req.params.id) },
    relations: {
      image: true
    }
  });
  res.status(200).json({ product });
}