const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ['on_sale', 'reserved', 'sold'], default: 'on_sale' },
    sellerId: { type: String },
  },
  { timestamps: true } // createdAt, updatedAt 자동 생성
);

productSchema.index({ name: 'text', description: 'text' }); // 검색용

module.exports = mongoose.model('Product', productSchema);
