// controllers/orderController.js
// Business logic for handling orders

import { getAllOrders, getOrderById, addOrder, updateOrderStatus } from '../models/orderModel.js';
import menuData from '../data/menuData.js'; // We’ll use menu items to calculate prices

// Create a new order
export const createOrder = (req, res) => {
  try {
    const { items, customerName } = req.body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    // Calculate total price
    let totalPrice = 0;
    const orderItems = items.map(item => {
      const menuItem = menuData.find(menu => menu.id === item.menuId);
      if (!menuItem) {
        throw new Error(`Menu item with ID ${item.menuId} not found`);
      }
      const itemTotal = menuItem.price * item.quantity;
      totalPrice += itemTotal;

      return {
        menuId: menuItem.id,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
        itemTotal
      };
    });

    const newOrder = {
      id: Date.now(), // simple unique ID
      customerName: customerName || "Anonymous",
      items: orderItems,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    addOrder(newOrder);

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
export const getAllOrdersController = (req, res) => {
  const orders = getAllOrders();
  res.status(200).json(orders);
};

// Get order by ID
export const getOrderByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  const order = getOrderById(id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json(order);
};

// Update order status
export const updateOrderStatusController = (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  const updatedOrder = updateOrderStatus(id, status);

  if (!updatedOrder) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json({
    message: 'Order status updated successfully',
    order: updatedOrder
  });
};
