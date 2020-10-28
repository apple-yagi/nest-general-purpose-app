import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-todo.dto';
import { Task } from './interfaces/task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  index(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id)
  }

  @Post()
  create(@Body(ValidationPipe) createTask: CreateTaskDto) {
    return this.tasksService.create(createTask);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateTask: CreateTaskDto) {
    return this.tasksService.update(id, updateTask)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id)
  }
}
