import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateResult } from 'typeorm';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ValidationPipe) item: CreateItemDto, @Request() req) {
    return this.itemsService.insert(item, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) item: UpdateItemDto,
  ): Promise<Item> {
    return this.itemsService.update(id, item as Partial<Item>);
  }
}
