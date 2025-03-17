import mongoose, { model, Schema } from 'mongoose';
import { IProduct } from './products.interface';

// Item Schema Definition
const productsSchema = new Schema<IProduct>(
  {
    sellerId: { type: mongoose.Schema.ObjectId, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    totalViews: { type: Number, default: 0 },

    condition: {
      type: String,
      enum: ['good', 'well'],
      required: true,
    },  
    isDeleted: { type: Boolean, default: false },
    images: { type: [String], required: true },
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
  },
  
  {
    timestamps: true,
  },
);

// Query Middleware
productsSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productsSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productsSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
const Product = model<IProduct>('Product', productsSchema);

export default Product;
