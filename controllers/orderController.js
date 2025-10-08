import {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrderStatus,
  deleteOrder,
} from "../models/orderModel.js";

import menuData from "../data/menuData.js";
import {
  updateStockLevel,
  getInventoryItemByMenuId,
  restoreStockLevel,
} from "../models/inventoryModel.js"; 

export const createOrder = (req, res) => {
  try {
    const { items, customerName } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    for (const item of items) {
      const menuItem = menuData.find((menu) => menu.id === item.menuId);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item ID ${item.menuId} not found` });
      }

      const stockItem = getInventoryItemByMenuId(menuItem.id);
      if (!stockItem) {
        return res.status(400).json({ message: `No inventory record for ${menuItem.name}` });
      }

      if (stockItem.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${menuItem.name}. Available: ${stockItem.quantity} ${stockItem.unit}`,
        });
      }
    }

    let totalPrice = 0;
    const orderItems = items.map((item) => {
      const menuItem = menuData.find((menu) => menu.id === item.menuId);
      const itemTotal = menuItem.price * item.quantity;
      totalPrice += itemTotal;

      const updatedStock = updateStockLevel(menuItem.id, item.quantity);
      console.log(`✅ Deducted ${item.quantity} from ${menuItem.name}. Remaining: ${updatedStock.quantity}`);

      return {
        menuId: menuItem.id,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
        itemTotal,
      };
    });

    const newOrder = {
      id: Date.now(),
      customerName: customerName || "Anonymous",
      items: orderItems,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);

    res.status(201).json({
      message: "✅ Order created successfully and inventory updated",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrdersController = (req, res) => {
  const orders = getAllOrders();
  res.status(200).json(orders);
};

export const getOrderByIdController = (req, res) => {
  const id = parseInt(req.params.id);
  const order = getOrderById(id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json(order);
};

export const updateOrderStatusController = (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const validStatuses = ["pending", "preparing", "served", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Use: ${validStatuses.join(", ")}` });
  }

  const updatedOrder = updateOrderStatus(id, status);

  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (status === "cancelled") {
    updatedOrder.items.forEach((item) => {
      const restored = restoreStockLevel(item.menuId, item.quantity);
      if (restored) {
        console.log(`🔄 Restored ${item.quantity} units of ${item.name} to inventory.`);
      }
    });
  }

  res.status(200).json({
    message: `Order status updated to '${status}'`,
    order: updatedOrder,
  });
};

export const deleteOrderController = (req, res) => {
  const id = parseInt(req.params.id);
  const deletedOrder = deleteOrder(id);

  if (!deletedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }

  deletedOrder.items.forEach((item) => {
    restoreStockLevel(item.menuId, item.quantity);
  });

  res.status(200).json({
    message: "🗑️ Order deleted and stock restored",
    deletedOrder,
  });
};
