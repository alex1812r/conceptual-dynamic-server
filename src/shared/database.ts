import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./constants";
import { ClientEntity } from "../modules/clients/entities/client-entity";
import { ProductEntity } from "../modules/products/entities/product.entity";
import { OrderEntity } from "../modules/orders/entities/order.entity";
import { OrderProductEntity } from "../modules/orders/entities/order-product.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [ClientEntity, ProductEntity, OrderEntity, OrderProductEntity],
  synchronize: true,
  logging: false,
});