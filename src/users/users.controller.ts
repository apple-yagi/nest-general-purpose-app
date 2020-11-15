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
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('items')
  getProfile(@Request() req) {
    return this.usersService.hasItems(req.user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) user: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, user as Partial<User>);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
