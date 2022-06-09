import { Request, Response } from "express";
import { ProductEntity } from "../entities/product.entity";

export const getProductsList = async (req: Request, res: Response) => {
  const productsList = await ProductEntity.find();
  res.status(200).json({ productsList });
}