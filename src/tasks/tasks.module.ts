import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  providers: [TasksResolver, TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
