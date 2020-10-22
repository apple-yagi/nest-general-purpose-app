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

export interface AnnotateResponse {
  responses: [
    {
      labelAnnotations: Array<AnnotateResult>;
    },
  ];
}

export interface AnnotateResult {
  mid: string;
  description: string;
  score: number;
}
