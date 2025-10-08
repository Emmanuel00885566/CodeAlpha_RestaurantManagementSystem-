import express from "express";
import {
  getAllInventoryController,
  getInventoryByIdController,
  addInventoryItemController,
  updateInventoryItemController,
  deleteInventoryItemController,
  updateStockLevelController,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAllInventoryController);
router.get("/:id", getInventoryByIdController);
router.post("/", addInventoryItemController);
router.put("/:id", updateInventoryItemController);
router.delete("/:id", deleteInventoryItemController);

router.put("/:id/stock", updateStockLevelController);

export default router;
