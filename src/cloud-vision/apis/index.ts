import axios, { AxiosResponse } from 'axios';
import { AnnotateResponse, AnnotateRequest } from 'types/cloud-vision';
import { toBase64 } from 'utils/image-conversion';

export const detection = async (
  filePath: string,
  annotateType: string,
): Promise<AnnotateResponse> => {
  const apiKey = process.env.CLOUD_VISION_API_KEY;
  console.log(filePath)
  const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const options: AnnotateRequest = {
    requests: [
      {
        image: {
          content: toBase64(filePath),
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

  try {
    const result: AxiosResponse<AnnotateResponse> = await axios.post(
      visionApiUrl,
      options,
    );
    return Promise.resolve(result.data);
  } catch (e) {
    console.error(e.response || e);
    throw e;
  }
};
