/*
 * @Date: 2023-04-05 17:36:34
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-08 15:56:35
 * @Description: Do not edit
 */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('统计')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post()
  create(@Body() createStatisticDto: CreateStatisticDto) {
    return this.statisticsService.create(createStatisticDto);
  }

  @Get('/blogInfo')
  @ApiOperation({ summary: '获取博客信息' })
  findBlobInfo() {
    return this.statisticsService.findBlobInfo();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatisticDto: UpdateStatisticDto) {
    return this.statisticsService.update(+id, updateStatisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticsService.remove(+id);
  }
}
