import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error('Price must be a positive number');
        },
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    images: [
        {
            url: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                default: '',
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

productSchema.index({ name: 'text', description: 'text' });


const Product = mongoose.model('Product', productSchema);

export default Product;