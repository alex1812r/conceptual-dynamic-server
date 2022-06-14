import { Request, Response } from "express";
import { ClientEntity } from "../../clients/entities/client-entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { OrderProductEntity } from "../entities/order-product.entity";
import { OrderEntity } from "../entities/order.entity";

type RequestBody = { 
  clientId: number;
  orderDate: string;
  description?: string;
  orderProducts: Array<{
    productId: number;
    count: number;
  }>;
}

export const createNewOrder = async (req: Request<{}, {}, RequestBody>, res: Response) => {
  const { clientId, orderProducts: auxOrderProducts } = req.body;
  
  if(!auxOrderProducts || !auxOrderProducts.length) {
    res.status(400).json({ 
      errors: [
        { message: 'missing products' }
      ] 
    });
    return;
  }
  
  const client = await ClientEntity.findOneBy({ id: clientId })
  
  if(!client) {
    res.status(400).json({ 
      errors: [
        { message: 'client not exist' }
      ] 
    });
    return;
  }

  const errors: Array<{ message: string }> = [];

  const order = new OrderEntity();
  order.orderDate = new Date(req.body.orderDate);
  order.client = client;
  order.description = req.body.description;
  order.total = 0;
  
  const orderProducts: Array<OrderProductEntity> = [];

  await Promise.all(auxOrderProducts.map(async (item) => {
    const product = await ProductEntity.findOneBy({ id: item.productId })
    
    if(!product) {
      errors.push({
        message: `product.id #${item.productId} not exist`,
      });
      return;
    } 
    
    if(item.count > product.count) {
      errors.push({
        message: `product.id #${item.productId} does not have the count`,
      });
      return;
    } 

    const orderProduct = new OrderProductEntity();
    orderProduct.count = item.count;
    orderProduct.productId = product.id;
    orderProduct.amount = product.unitPrice * orderProduct.count;
    order.total += orderProduct.amount;
    
    orderProducts.push(orderProduct);
  }))

  if(errors.length) {
    res.status(400).json({ errors })
    return;
  }

  try {
    const savedOrder = await order.save();
    await Promise.all(orderProducts.map(async orderProduct => {
      orderProduct.orderId = savedOrder.id
      const result = await orderProduct.save();
      await ProductEntity.update(
        { id: orderProduct.productId },
        { count() { return `count - ${orderProduct.count}` } }
      )
      return result;
    }));
  } catch(err) {
    const error = err as Error;
    res.status(400).json({ 
      errors: [
        { message: error.message }
      ] 
    });
    return;
  }
  
  res.status(200).json({ order });
};