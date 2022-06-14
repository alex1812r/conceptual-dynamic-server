import { Request, Response } from "express";
import { ProductEntity } from "../../products/entities/product.entity";
import { OrderEntity } from "../entities/order.entity";
import { OrderStatusEnum } from "../orders.types";

type RequetParams = {
  id: string;
}

export const deleteOrder = async (req: Request<RequetParams>, res: Response) => {

  const order = await OrderEntity.findOne({
    where: { id: Number(req.params.id) },
    relations: {
      orderProducts: true
    }
  });

  if(order) {
    order.deletedAt = new Date();
    await order.save();
    
    await Promise.all(order.orderProducts.map((orderProduct) => {
      if(OrderStatusEnum.pending) {
        return ProductEntity.update(
          { id: orderProduct.productId }, 
          { count: () => `count + ${orderProduct.count}` }
        )
      }
    }));
  }

  res.status(200).json({ success: true });
};