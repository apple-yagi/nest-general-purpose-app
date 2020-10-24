import { Injectable } from '@nestjs/common';
import detection from './api/detection';
import * as fs from 'fs';

@Injectable()
export class CloudVisionService {
  async detection(filepath: string, type: string): Promise<any> {
    try {
      const result = await detection(filepath, type);
      fs.unlinkSync(filepath);
      return Promise.resolve(result);
    } catch (e) {
      return e;
    }
  }
}
