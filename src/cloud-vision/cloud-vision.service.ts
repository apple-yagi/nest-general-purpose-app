import { Injectable } from '@nestjs/common';
import Client from './apis/api-client';

@Injectable()
export class CloudVisionService {
  async detection(client: Client): Promise<any> {
    try {
      const result = await client.detection();
      return Promise.resolve(result);
    } catch (e) {
      return e;
    }
  }
}
