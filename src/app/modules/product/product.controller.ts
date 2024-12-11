import { Request, Response } from 'express';
import { productService } from './product.service';
import { OrderModel } from './product.model';

const CreateStationeryProduct = async (req: Request, res: Response) => {
  try {
    const { product: productOfDB } = req.body;

    const result = await productService.crateProductIntoDB(productOfDB);

    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create product',
      success: false,
      error,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductFromDB();
    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve products',
      status: false,
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getSingleProductFromDB(productId);
    res.status(200).json({
      message: 'Product retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve product',
      status: false,
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const payload = req.body;

    const result = await productService.updateAProduct(productId, payload);
    res.status(200).json({
      message: 'Product updated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update product',
      status: false,
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productService.deleteAProduct(productId);
    res.status(200).json({
      message: 'Product deleted successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete product',
      status: false,
      error,
    });
  }
};

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const orderData = req.body;

      const newOrder = await productService.OrderService.createOrder(orderData);

      res.status(200).json({
        message: 'Order created successfully',
        status: true,
        data: newOrder,
      });
    } catch (error) {
      res.status(400).json({
        message: error || 'Failed to create order',
        status: false,
      });
    }
  }
}

export class revenueController {
  static async calculateRevenue(req: Request, res: Response) {
    try {
      const revenueData = await OrderModel.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'product',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
        {
          $project: {
            totalPrice: { $multiply: ['$quantity', '$productDetails.price'] },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalPrice' },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
          },
        },
      ]);

      const totalRevenue =
        revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

      res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
          totalRevenue,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error calculating revenue',
        status: false,
        error,
      });
    }
  }
}

export const productController = {
  CreateStationeryProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
