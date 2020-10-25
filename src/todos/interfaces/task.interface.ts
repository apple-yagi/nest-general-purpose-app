import * as mongoose from 'mongoose';

export interface Task extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}
