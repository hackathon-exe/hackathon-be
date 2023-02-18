import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';
import { OrderModule } from './module/order/order.module';


@Module({
  imports: [TypeOrmConfigModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
