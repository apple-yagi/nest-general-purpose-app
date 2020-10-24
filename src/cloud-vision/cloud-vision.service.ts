import { Injectable } from '@nestjs/common';
import detection from './api/detection';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { LabelDetectionResult } from './interfaces/label-detection-result';
import { InjectModel } from '@nestjs/mongoose';
import { LabelAnnotateResponse } from 'types/cloud-vision';

@Injectable()
export class CloudVisionService {
  constructor(
    @InjectModel('LabelDetectionResult')
    private readonly labelDetectionModel: Model<LabelDetectionResult>,
  ) {}

  async save(result: LabelAnnotateResponse) {
    result.responses.map(annotateResults => {
      annotateResults.labelAnnotations.map(annotateResult => {
        const createdResult = new this.labelDetectionModel(annotateResult);
        createdResult.save();
      });
    });
  }

  async detection(
    filepath: string,
    type: string,
  ): Promise<LabelAnnotateResponse> {
    try {
      const result = await detection(filepath, type);
      fs.unlinkSync(filepath);
      if (type === 'LABEL_DETECTION') {
        this.save(result);
      }
      return Promise.resolve(result);
    } catch (e) {
      return e;
    }
  }
}
