// import mongoose, { Schema } from "mongoose";
import mongoose, { Schema, model, connect } from 'mongoose';

import { IOrder, TProduct } from './product.interface';

// export interface IProductModel extends IProduct, Document {}

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const OrderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

export const OrderModel = model<IOrder>('Order', OrderSchema);

export const ProductModel = model<TProduct>('product', ProductSchema);
