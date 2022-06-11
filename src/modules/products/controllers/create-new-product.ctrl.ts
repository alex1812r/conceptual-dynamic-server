import { Request, Response } from "express";
import { ProductEntity } from "../entities/product.entity";

export const createNewProduct = async (req: Request, res: Response) => {
  const product = new ProductEntity();
  product.name = req.body.name;
  product.count = req.body.count;
  product.description = req.body.name;
  product.unitPrice = req.body.unitPrice;
  product.imgUrl = req.body.imgUrl;

  try {
    await product.save();
    res.status(201).json({ product });
  } catch(e) { 
    res.status(400).send(e);
  }
};