import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { LabelDetectionResultsModule } from 'src/label-detection-results/label-detection-results.module';
import { CloudVisionController } from './cloud-vision.controller';
import { CloudVisionService } from './cloud-vision.service';
const destination =
  process.env.GCLOUD_VISION_DESTINATION_PATH || './cloud-vision-uploads';

@Module({
  imports: [
    forwardRef(() => LabelDetectionResultsModule),
    MulterModule.register({
      dest: destination,
    }),
  ],
  providers: [CloudVisionService],
  controllers: [CloudVisionController],
})
export class CloudVisionModule { }
