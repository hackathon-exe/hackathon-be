import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Configuration, OpenAIApi, CreateCompletionResponse } from 'openai';
import { lastValueFrom, Observable } from 'rxjs';
import { OPENAI_API_KEY } from 'src/environments';
import generateTextDTO from './dto/createText.dto';
@Injectable()
export default class ChatBoxService {
    constructor(private readonly httpService: HttpService,
    ) {
    }
    async generateText(prompt: string): Promise<any> {
        const configuration = new Configuration({
            apiKey: OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response: any = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stream: false,
            logprobs: null
        });
        return response.data.choices[0].text
    }
}

