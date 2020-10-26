import * as mongoose from 'mongoose';

export const LabelDetectionResult = new mongoose.Schema(
  {
    mid: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    topicality: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
