import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudVisionModule } from './cloud-vision/cloud-vision.module';
import { TasksModule } from './tasks/tasks.module';
import { LabelDetectionResultsModule } from './label-detection-results/label-detection-results.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CloudVisionModule,
    CloudVisionModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DB || 'mydb',
      entities: [User],
      synchronize: true,
    }),
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
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
