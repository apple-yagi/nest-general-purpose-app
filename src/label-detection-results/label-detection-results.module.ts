import { Module } from '@nestjs/common';
import { LabelDetectionResultsService } from './label-detection-results.service';
import { LabelDetectionResultsController } from './label-detection-results.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelDetectionResult } from './schemas/label-detection-result';
import { LabelDetectionResultsResolver } from './label-detection-results.resolver';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'LabelDetectionResult', schema: LabelDetectionResult },
  ]),],
  providers: [LabelDetectionResultsService, LabelDetectionResultsResolver],
  controllers: [LabelDetectionResultsController],
  exports: [LabelDetectionResultsService]
})
export class LabelDetectionResultsModule { }
