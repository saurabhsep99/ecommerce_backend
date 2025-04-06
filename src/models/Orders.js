// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
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
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentInfo: {
      id: String, // Payment gateway ID (e.g., Stripe)
      status: String,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

// Calculate total price before saving
orderSchema.pre('save', function (next) {
  const itemsTotal = this.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  this.totalPrice = itemsTotal + this.taxPrice + this.shippingPrice;
  next();
});

export default mongoose.model('Order', orderSchema);