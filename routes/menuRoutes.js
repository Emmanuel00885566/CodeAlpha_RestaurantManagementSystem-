import express from "express";
import {
  getAllMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", addMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
