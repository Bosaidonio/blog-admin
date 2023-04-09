/*
 * @Date: 2023-03-26 10:40:30
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-08 16:03:40
 * @Description: Do not edit
 */
import { GptMessage } from '@/contacts/business-message';
import { ThrowError } from '@/contacts/throw-error';
import { Injectable } from '@nestjs/common';
import { HttpsProxyAgent } from 'https-proxy-agent';

export const importDynamic = new Function('modulePath', 'return import(modulePath)');

@Injectable()
export class ChatGptService {
  private client: any;

  constructor() {
    this.initClient();
  }

  async initClient() {
    const { ChatGPTAPI } = await importDynamic('chatgpt');
    const fetch = await (eval('import("node-fetch")') as Promise<typeof import('node-fetch')>);
    this.client = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY,
      fetch: (url, options = {}) => {
        const defaultOptions = {
          agent: new HttpsProxyAgent('http://127.0.0.1:7890'),
        };
        const mergedOptions = {
          ...defaultOptions,
          ...options,
        };
        return fetch.default(url, mergedOptions);
      },
    });
  }
  async generateText(body, res) {
    try {
      const { parentMessageId, prompt } = body;
      console.log(prompt);
      let firstChunk = true;
      const result = await this.client.sendMessage(prompt, {
        parentMessageId,
        onProgress: (partialResponse) => {
          if (!partialResponse.delta) {
            return;
          }
          // console.log(partialResponse);

          // const eventData = {
          //   data: {
          //     message: partialResponse.delta.replace(/\n/g, '  \n'),
          //     parentMessageId: partialResponse.parentMessageId,
          //   },
          // };
          res.write(partialResponse.delta);
          firstChunk = false;
        },
      });
    } catch (error) {
      ThrowError(GptMessage.GPT_GENERATE_FAILED, error.message, error.statusCode);
    }
  }
}
