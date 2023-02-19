import { Controller, Get } from "@nestjs/common";
import { Body, Param, Post } from "@nestjs/common/decorators";
import ChatBoxService from "./chatBot.service";
import generateTextDTO from "./dto/createText.dto";

@Controller('chatbox')
export class ChatBotController {
    constructor(private chatBoxService: ChatBoxService) { }
    @Post('chatbot')
    async generateTest(@Body() dto: generateTextDTO): Promise<any> {
        return this.chatBoxService.generateText(dto.input);

    }
}
