// routes/orderRoutes.js
import express from 'express';
import {
  createOrder,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController
} from '../controllers/orderController.js';

const router = express.Router();

// POST - Create order
router.post('/', createOrder);

// GET - All orders
router.get('/', getAllOrdersController);

// GET - Single order
router.get('/:id', getOrderByIdController);

// PUT - Update status
router.put('/:id/status', updateOrderStatusController);

export default router;
