import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-todo.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id).exec()
      return Promise.resolve(task)
    } catch (e) {
      return e
    }
  }

  async create(task: CreateTaskDto): Promise<Task> {
    const createTask = new this.taskModel(task);
    try {
      const createdTask = await createTask.save()
      return Promise.resolve(createdTask)
    } catch (e) {
      return e
    }
  }

  async update(id: string, updateTask: CreateTaskDto): Promise<Task> {
    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTask)
      return Promise.resolve(updatedTask)
    } catch (e) {
      return e
    }
  }

  async delete(id: string): Promise<Task> {
    try {
      const deletedTask = await this.taskModel.findByIdAndRemove(id).exec()
      return Promise.resolve(deletedTask)
    } catch (e) {
      return e
    }
  }
}
