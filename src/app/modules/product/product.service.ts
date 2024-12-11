import { TProduct } from './product.interface';
import { OrderModel, ProductModel } from './product.model';

const crateProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateAProduct = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteAProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

class OrderService {
  static async createOrder(orderData: {
    email: string;
    product: string;
    quantity: number;
    totalPrice: number;
  }) {
    const product = await ProductModel.findById(orderData.product);

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.quantity < orderData.quantity) {
      throw new Error('Insufficient stock for this product');
    }

    product.quantity -= orderData.quantity;
    if (product.quantity === 0) {
      product.inStock = false;
    }
    await product.save();

    const order = new OrderModel(orderData);
    return await order.save();
  }
}

export const productService = {
  crateProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateAProduct,
  deleteAProduct,
  OrderService,
};
