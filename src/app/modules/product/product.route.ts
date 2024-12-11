import express, { request, Request, response, Response } from 'express';
import {
  OrderController,
  productController,
  revenueController,
} from './product.controller';

const router = express.Router();

router.post('/products', productController.CreateStationeryProduct);
router.get('/products', productController.getAllProduct);
router.get('/products/:productId', productController.getSingleProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

// class OrderController {
//   static async createOrder(req: Request, res: Response) {
//     const { email, product, quantity, totalPrice } = req.body;
//     res.status(200).json({ message: 'Order created successfully' });
//   }
// }
// const order = new productController.OrderController();

router.post('/orders', OrderController.createOrder);
router.get('/orders/revenue', revenueController.calculateRevenue);

export const productRout = router;
