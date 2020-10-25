import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
});
