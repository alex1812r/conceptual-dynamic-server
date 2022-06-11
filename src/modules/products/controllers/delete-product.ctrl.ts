import { Request, Response } from "express";
import { ProductEntity } from "../entities/product.entity";

type RequetParams = {
  id: string;
}

export const deleteProduct = async (req: Request<RequetParams>, res: Response) => {

  await ProductEntity.update(
    { id: Number(req.params.id) },
    { deletedAt: new Date() }
  )

  res.status(200).json({ success: true })
};