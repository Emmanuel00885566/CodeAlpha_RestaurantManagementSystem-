import express from 'express';
import {
  createOrder,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);

router.get('/', getAllOrdersController);

router.get('/:id', getOrderByIdController);

router.put('/:id/status', updateOrderStatusController);

export default router;
