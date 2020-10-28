import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudVisionModule } from './cloud-vision/cloud-vision.module';
import { TasksModule } from './tasks/tasks.module';
import { LabelDetectionResultsModule } from './label-detection-results/label-detection-results.module';

@Module({
  imports: [
    CloudVisionModule,
    CloudVisionModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/nest',
    ),
    GraphQLModule.forRoot({
      playground: true,
      typePaths: ['./src/schema.graphql'],
      autoSchemaFile:
        process.env.NODE_ENV === 'development' ? './src/schema.graphql' : false,
    }),
    TasksModule,
    LabelDetectionResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
