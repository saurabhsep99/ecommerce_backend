// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews by the same user for the same product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);