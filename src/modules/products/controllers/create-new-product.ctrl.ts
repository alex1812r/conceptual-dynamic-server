import { Request, Response } from "express";
import { ProductEntity } from "../entities/product.entity";

export const createNewProduct = async (req: Request, res: Response) => {
  const inputData = {
    name: req.body.name,
    count: req.body.count,
    description: req.body.name,
    unitPrice: req.body.unitPrice,
    imgUrl: req.body.imgUrl
  };
  try {
    const result = await ProductEntity.insert(inputData);
    const product = await ProductEntity.findOne({ 
      where: { id: result.raw.insertId } 
    }); 
    res.status(201).json({ product });
  } catch(e) { 
    res.status(400).send(e);
  }
};