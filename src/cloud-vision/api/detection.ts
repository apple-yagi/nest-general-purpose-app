import axios from 'axios';
import { AnnotateRequest } from 'types/cloud-vision';
import { toBase64 } from 'utils/image-conversion';

export default async (filepath: string, annotateType: string): Promise<any> => {
  try {
    const options: AnnotateRequest = {
      requests: [
        {
          image: {
            content: toBase64(filepath),
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
    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.CLOUD_VISION_API_KEY}`;
    const result = await axios.post(visionApiUrl, options);
    return Promise.resolve(result.data);
  } catch (e) {
    throw e;
  }
};
