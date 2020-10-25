import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-todo.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  create(task: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }
}
