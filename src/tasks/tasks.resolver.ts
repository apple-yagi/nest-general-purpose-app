import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskDto } from './dto/create-todo.dto';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Resolver('Tasks')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) { }

  @Query(returns => [Task])
  async tasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Query(returns => Task)
  async task(@Args('id', { type: () => String }) id: string): Promise<Task> {
    return this.tasksService.findOne(id)
  }

  @Mutation(returns => Task)
  async createTask(
    @Args('title', { type: () => String }) title: string,
    @Args('description', { type: () => String }) description: string,
  ): Promise<Task> {
    const createTask: CreateTaskDto = {
      title: title,
      description: description,
    };
    return this.tasksService.create(createTask);
  }

  @Mutation(returns => Task)
  async updateTask(@Args('id', { type: () => String }) id: string, @Args('title', { type: () => String }) title: string, @Args('description', { type: () => String }) description: string): Promise<Task> {
    const updateTask: CreateTaskDto = {
      title: title,
      description: description
    }
    return this.tasksService.update(id, updateTask)
  }

  @Mutation(returns => Task)
  async deleteTask(@Args('id', { type: () => String }) id: string): Promise<Task> {
    return this.tasksService.delete(id)
  }
}
