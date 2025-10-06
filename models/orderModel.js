// models/orderModel.js
// Handles order data operations

import orders from '../data/orderData.js';

export const getAllOrders = () => {
  return orders;
};

export const getOrderById = (id) => {
  return orders.find(order => order.id === id);
};

export const addOrder = (order) => {
  orders.push(order);
  return order;
};

export const updateOrderStatus = (id, status) => {
  const order = orders.find(order => order.id === id);
  if (order) {
    order.status = status;
    return order;
  }
  return null;
};
