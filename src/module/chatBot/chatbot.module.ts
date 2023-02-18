import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenAIApi, Configuration } from 'openai';
import { ChatBotController } from './chatbot.controller';
import ChatBoxService from './chatBot.service';

@Module({
    imports: [HttpModule],
    controllers: [ChatBotController],
    providers: [ChatBoxService],
})
export class ChatBotModule { }
