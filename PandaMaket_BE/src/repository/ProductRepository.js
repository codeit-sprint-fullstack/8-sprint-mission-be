import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
            default: [],
        },
        images: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

export const ProductRepository = mongoose.model('Product', ProductSchema);
