import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CloudVisionController } from './cloud-vision.controller';
import { CloudVisionService } from './cloud-vision.service';

@Module({
  imports: [
    MulterModule.register({
      dest: process.env.GCLOUD_VISION_DESTNATION_PATH,
    }),
  ],
  providers: [CloudVisionService],
  controllers: [CloudVisionController],
})
export class CloudVisionModule {}
