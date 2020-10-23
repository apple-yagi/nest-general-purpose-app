import { Injectable } from '@nestjs/common';
import { AnnotateResult } from 'types/cloud-vision';
import * as CloudVisionApis from './apis/index';
import * as fs from 'fs';
import { IUploadedFile } from 'types/file';

@Injectable()
export class CloudVisionService {
  async detection(file: IUploadedFile, type: string): Promise<AnnotateResult[]> {
    try {
      const annotateResponse = await CloudVisionApis.detection(file.path, type);
      fs.unlinkSync(file.path);
      return Promise.resolve(annotateResponse.responses[0].labelAnnotations);
    } catch (e) {
      throw e;
    }
  }
}
