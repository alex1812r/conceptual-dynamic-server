import { Request, Response } from "express";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { FileEntity } from "../../files/entities/Files.entity";
import { ProductEntity } from "../entities/product.entity";

type RequestParams = {
  id: string;
}
type RequestBody = Partial<{
  name: string;
  count: number;
  description: string;
  unitPrice: number;
  updateImage?: {
    fileId: string;
    filename: string;
    url: string;
  }
}>
export const updateProduct = async (req: Request<RequestParams, {}, RequestBody>, res: Response) => {
  const productId = Number(req.params.id);
  
  const { updateImage, ...body } = req.body;

  const updateData: QueryDeepPartialEntity<ProductEntity> = {
    name: body.name,
    count: body.count,
    description: body.description,
    unitPrice: body.unitPrice,
  };

  if(updateImage) {
    const newImage = new FileEntity();
    newImage.fileId = updateImage.fileId;
    newImage.filename = updateImage.filename;
    newImage.url = updateImage.url;

    const savedImage = await newImage.save();
    updateData.imageId = savedImage.id;
  }

  const updatedProduct = await ProductEntity
    .update({ id: productId }, updateData)
    .then(() => ProductEntity.findOneBy({ id: productId }));

  res.status(200).json({ product: updatedProduct });
}