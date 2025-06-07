import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    author: String,
    date_posted: String,
  },
  { timestamps: true },
);
