import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LabelDetectionResult } from './interfaces/label-detection-result';
import { LabelAnnotateResponse } from 'types/cloud-vision';

@Injectable()
export class LabelDetectionResultsService {
  constructor(@InjectModel('LabelDetectionResult') private readonly labelDetectionResultModel: Model<LabelDetectionResult>) { }

  async findAll(): Promise<LabelDetectionResult[]> {
    return this.labelDetectionResultModel.find().exec();
  }

  async findById(id: string): Promise<LabelDetectionResult> {
    try {
      const result = await this.labelDetectionResultModel.findById(id).exec();
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async save(result: LabelAnnotateResponse) {
    result.responses.map(annotateResults => {
      annotateResults.labelAnnotations.map(annotateResult => {
        const createdResult = new this.labelDetectionResultModel(annotateResult);
        createdResult.save();
      });
    });
  }
}
