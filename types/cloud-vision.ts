export interface AnnotateRequest {
  requests: [
    {
      image: {
        content: string;
      };
      features: [
        {
          type: string;
          maxResults: number;
        },
      ];
    },
  ];
}

export interface LabelAnnotateResponse {
  responses: Array<LabelAnnotations>;
}

export interface LabelAnnotations {
  labelAnnotations: Array<LabelAnnotateResult>;
}

export interface LabelAnnotateResult {
  mid: string;
  description: string;
  score: number;
  topicality: number;
}
