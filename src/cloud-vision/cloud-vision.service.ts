import { forwardRef, Inject, Injectable } from '@nestjs/common';
import detection from './api/detection';
import * as fs from 'fs';
import { LabelAnnotateResponse } from 'types/cloud-vision';
import { LabelDetectionResultsService } from 'src/label-detection-results/label-detection-results.service';

@Injectable()
export class CloudVisionService {
  constructor(@Inject(forwardRef(() => LabelDetectionResultsService)) private readonly labelDetectionResultsService: LabelDetectionResultsService) { }

  async detection(
    filepath: string,
    type: string,
  ): Promise<LabelAnnotateResponse> {
    try {
      const result = await detection(filepath, type);
      fs.unlinkSync(filepath);
      if (type === 'LABEL_DETECTION') {
        this.labelDetectionResultsService.save(result)
      }
      return Promise.resolve(result);
    } catch (e) {
      return e;
    }
  }
}
