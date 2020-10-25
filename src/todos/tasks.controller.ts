import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-todo.dto';
import { Task } from './interfaces/task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  index(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body(ValidationPipe) createTask: CreateTaskDto) {
    return this.tasksService.create(createTask);
  }
}
