import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { CloudVisionController } from './cloud-vision.controller';
import { CloudVisionService } from './cloud-vision.service';
import { LabelDetectionResult } from './schemas/label-detection-result';
const destination =
  process.env.GCLOUD_VISION_DESTINATION_PATH || './cloud-vision-uploads';

@Module({
  imports: [
    MulterModule.register({
      dest: destination,
    }),
    MongooseModule.forFeature([
      { name: 'LabelDetectionResult', schema: LabelDetectionResult },
    ]),
  ],
  providers: [CloudVisionService],
  controllers: [CloudVisionController],
})
export class CloudVisionModule {}
