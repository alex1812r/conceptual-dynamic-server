import { Request, Response } from "express";
import { ProductEntity } from "../entities/product.entity";

type RequestParams = {
  id: string;
}
export const getSingleProduct = async (req: Request<RequestParams>, res: Response) => {
  const product = await ProductEntity.findOneBy({ id: Number(req.params.id) });
  res.status(200).json({ product });
}