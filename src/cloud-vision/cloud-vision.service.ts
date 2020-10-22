import { Injectable } from '@nestjs/common';
import { AnnotateResult } from 'types/cloud-vision';
import * as CloudVisionApis from './apis/index';
import * as fs from 'fs';

@Injectable()
export class CloudVisionService {
  async detection(file, type): Promise<AnnotateResult[]> {
    try {
      const annotateResponse = await CloudVisionApis.detection(file.path, type);
      fs.unlinkSync(file.path);
      return Promise.resolve(annotateResponse.responses[0].labelAnnotations);
    } catch (e) {
      throw e;
    }
  }
}
