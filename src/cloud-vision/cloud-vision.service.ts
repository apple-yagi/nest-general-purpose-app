import { Injectable } from '@nestjs/common';
import detection from './api/detection';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { LabelDetectionResult } from './interfaces/label-detection-result';
import { InjectModel } from '@nestjs/mongoose';
import { LabelAnnotateResponse, LabelAnnotateResult } from 'types/cloud-vision';

@Injectable()
export class CloudVisionService {
  constructor(
    @InjectModel('LabelDetectionResult')
    private readonly labelDetectionModel: Model<LabelDetectionResult>,
  ) {}

  async findAll(): Promise<LabelAnnotateResult[]> {
    return this.labelDetectionModel.find().exec();
  }

  async findById(id: string): Promise<LabelAnnotateResult> {
    try {
      const result = await this.labelDetectionModel.findById(id).exec();
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

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
