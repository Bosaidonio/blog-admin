/*
 * @Date: 2023-03-26 10:40:38
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-03-26 16:09:05
 * @Description: Do not edit
 */
import { Module } from '@nestjs/common';
import { ChatController } from './chat-gpt.controller';
import { ChatGptService } from './chat-gpt.service';

@Module({
  controllers: [ChatController],
  providers: [
    ChatGptService,
  ],
})
export class ChatGptModule {}
