import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { OrderEntity } from "./entities/order.entity"
import { OrderController } from "./order.controller"
import OrderService from "./order.service"

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity]), HttpModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }
