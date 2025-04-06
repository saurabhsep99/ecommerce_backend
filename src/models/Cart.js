// models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // One cart per user
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
});

// Calculate cart total (virtual property)
cartSchema.virtual('totalPrice').get(function () {
  return this.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
});

export default mongoose.model('Cart', cartSchema);