import * as mongoose from 'mongoose';

export interface LabelDetectionResult extends mongoose.Document {
  id: string;
  mid: string;
  description: string;
  score: number;
  topicality: number;
  createdAt: string;
  updatedAt: string;
}
