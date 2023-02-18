import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';
import { ChatBotModule } from './module/chatBot/chatbot.module';
import { OrderModule } from './module/order/order.module';


@Module({
  imports: [TypeOrmConfigModule, OrderModule, ChatBotModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
