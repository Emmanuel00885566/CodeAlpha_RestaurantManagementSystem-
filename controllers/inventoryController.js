import {
  getAllInventory,
  getInventoryById,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateStockLevel,
} from "../models/inventoryModel.js";

export const getAllInventoryController = (req, res) => {
  const data = getAllInventory();
  res.json(data);
};

export const getInventoryByIdController = (req, res) => {
  const item = getInventoryById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

export const addInventoryItemController = (req, res) => {
  const { name, quantity, unit, lowStockThreshold } = req.body;
  if (!name || !quantity || !unit) {
    return res
      .status(400)
      .json({ message: "Name, quantity, and unit are required" });
  }

  const newItem = addInventoryItem({ name, quantity, unit, lowStockThreshold });
  res
    .status(201)
    .json({ message: "Item added successfully", item: newItem });
};

export const updateInventoryItemController = (req, res) => {
  const updated = updateInventoryItem(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item updated successfully", item: updated });
};


export const deleteInventoryItemController = (req, res) => {
  const deleted = deleteInventoryItem(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted successfully" });
};

export const updateStockLevelController = (req, res) => {
  const { quantityUsed } = req.body;

  if (quantityUsed == null) {
    return res.status(400).json({ message: "quantityUsed is required" });
  }

  const item = getInventoryById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (quantityUsed > item.quantity) {
    return res.status(400).json({
      message: `Not enough stock available for ${item.name}. Only ${item.quantity} ${item.unit} left.`,
    });
  }

  const updatedItem = updateStockLevel(req.params.id, quantityUsed);
  res.json({
    message: `Stock updated successfully. ${quantityUsed} ${item.unit} of ${item.name} used.`,
    item: updatedItem,
  });
};
