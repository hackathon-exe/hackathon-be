import { Controller, Get } from "@nestjs/common";
import { Body, Param, Post } from "@nestjs/common/decorators";
const csvParser = require('csv-parser');
import * as fs from 'fs';
import * as path from 'path';
import ChatBoxService from "./chatBot.service";
import generateTextDTO from "./dto/createText.dto";

@Controller('chatbox')
export class ChatBotController {
    constructor(private chatBoxService: ChatBoxService) { }
    @Post('chatbot')
    async generateTest(@Body() dto: generateTextDTO): Promise<any> {
        console.log(dto.prompt)
        return this.chatBoxService.generateText(dto.prompt);

    }
}
