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
