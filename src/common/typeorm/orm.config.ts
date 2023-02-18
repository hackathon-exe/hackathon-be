import { Injectable } from "@nestjs/common";
import { OrderEntity } from "src/module/order/entities/order.entity";
import { OrderItemEntity } from "src/module/orderItem/entities/orderItem.entity";
import { UserEntity } from "src/module/user/entities/user.entity";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from "src/environments";
import { ItemEntity } from "src/module/item/entities/item.entity";
import { DatasetEntity } from "src/module/dataset/entities/dataset.entity";


const entities = [
  OrderEntity,
  OrderItemEntity,
  ItemEntity,
  UserEntity,
  DatasetEntity
];
@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const baseOptions: TypeOrmModuleOptions = {
      type: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      synchronize: true,
      logging: false,
      entities,
    };
    return baseOptions;
  }
}
