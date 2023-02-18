import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { lastValueFrom, Observable } from 'rxjs';
import { OPENAI_API_KEY } from 'src/environments';
import generateTextDTO from './dto/createText.dto';
@Injectable()
export default class ChatBoxService {
    private readonly openai: OpenAIApi;
    constructor(private readonly httpService: HttpService,
    ) {
    }
    generateText(prompt: string): any {
        let token = `Bearer ${OPENAI_API_KEY}`;

        return this.httpService.post('https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 2048,
                temperature: 0.2,
                n: 1,
                stream: false,
                logprobs: null,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        )

    }
}

