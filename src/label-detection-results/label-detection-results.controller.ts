import { Controller, Get, Param } from '@nestjs/common';
import { LabelDetectionResult } from './interfaces/label-detection-result';
import { LabelDetectionResultsService } from './label-detection-results.service';

@Controller('label-detection-results')
export class LabelDetectionResultsController {
  constructor(private readonly labelDetectionResultsService: LabelDetectionResultsService) { }

  @Get()
  index(): Promise<LabelDetectionResult[]> {
    return this.labelDetectionResultsService.findAll()
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<LabelDetectionResult> {
    return this.labelDetectionResultsService.findById(id)
  }
}
