import axios from 'axios';
import * as fs from 'fs';
import { AnnotateRequest } from 'types/cloud-vision';
import { toBase64 } from 'utils/image-conversion';

class Client {
  private filepath: string;
  private visionApiUrl: string;
  private options: AnnotateRequest;

  constructor(filepath: string, annotateType: string) {
    this.filepath = filepath;
    this.visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.CLOUD_VISION_API_KEY}`;
    this.options = {
      requests: [
        {
          image: {
            content: toBase64(this.filepath),
          },
          features: [
            {
              type: annotateType,
              maxResults: 10,
            },
          ],
        },
      ],
    };
  }

  async detection(): Promise<any> {
    try {
      const result = await axios.post(this.visionApiUrl, this.options);
      fs.unlinkSync(this.filepath);
      return Promise.resolve(result.data);
    } catch (e) {
      throw e;
    }
  }
}

export default Client;
