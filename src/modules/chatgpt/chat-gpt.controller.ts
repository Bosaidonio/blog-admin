/*
 * @Date: 2023-03-26 10:40:16
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-08 15:57:18
 * @Description: Do not edit
 */
import { Body, Controller, Get, Header, Param, Post, Req, Res, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatGptService } from './chat-gpt.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('chat')
export class ChatController {
  constructor(private chatGptService: ChatGptService) {}

  // @Get('/message/:prompt')
  // async generateText(@Param('prompt') prompt: string): Promise<string> {
  //   console.log(prompt);
  //   return this.chatGptService.generateText(prompt);
  // }

  @Post('/conversation')
  @Header('Content-Type', 'text/event-stream')
  conversation(@Body() body, @Res() res) {
    return this.chatGptService.generateText(body, res);
  }
}
