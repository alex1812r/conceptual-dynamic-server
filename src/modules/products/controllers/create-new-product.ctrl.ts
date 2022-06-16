import { Request, Response } from "express";
import { FileEntity } from "../../files/entities/Files.entity";
import { ProductEntity } from "../entities/product.entity";

type RequestBody = {
  name: string;
  count: number;
  description: string;
  unitPrice: number;
  image?: {
    fileId: string;
    filename: string;
    url: string;
  }
}

export const createNewProduct = async (req: Request<{}, {}, RequestBody>, res: Response) => {
  const { name, count, description, unitPrice, image } = req.body;

  const product = new ProductEntity();
  product.name = name;
  product.count = count;
  product.description = description;
  product.unitPrice = unitPrice;

  if(image) {
    const newImage = new FileEntity();
    newImage.fileId = image.fileId;
    newImage.filename = image.filename;
    newImage.url = image.url;

    const savedImage = await newImage.save();
    product.imageId = savedImage.id;
  }

  try {
    await product.save();
    res.status(201).json({ product });
  } catch(e) { 
    res.status(400).send(e);
  }
};