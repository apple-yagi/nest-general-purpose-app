import * as mongoose from 'mongoose';

export interface LabelDetectionResult extends mongoose.Document {
  mid: string;
  description: string;
  score: number;
  topicality: number;
}
