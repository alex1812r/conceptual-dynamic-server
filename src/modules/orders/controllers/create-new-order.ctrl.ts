import { Request, Response } from "express";
import { ClientEntity } from "../../clients/entities/client-entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { OrderProductEntity } from "../entities/order-product.entity";
import { OrderEntity } from "../entities/order.entity";

type RequestBody = { 
  clientId: number;
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

  const order = new OrderEntity();
  order.client = client;
  order.total = 0;

  // let total = 0;
  const missingProducts: Array<{ id: number }> = [];
  const orderProducts: Array<OrderProductEntity> = [];

  await Promise.all(auxOrderProducts.map(async (item) => {
    const product = await ProductEntity.findOneBy({ id: item.productId })
    
    if(!product) {
      missingProducts.push({ id: item.productId });
      return;
    }

    const orderProduct = new OrderProductEntity();
    orderProduct.count = item.count;
    orderProduct.productId = product.id; 
    orderProduct.amount = product.unitPrice * orderProduct.count;
    order.total += orderProduct.amount;
    
    orderProducts.push(orderProduct);
  }))

  if(missingProducts.length) {
    res.status(400).json({ errors: missingProducts.map((item) => ({
      message: `product.id #${item.id} not exist`
    }))})
    return;
  }

  try {
    const savedOrder = await order.save();
    await Promise.all(orderProducts.map(orderProduct => {
      orderProduct.orderId = savedOrder.id
      return orderProduct.save()
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