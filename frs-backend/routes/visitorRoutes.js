import express from "express";
import {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor
} from "../controllers/visitorController.js";

const router = express.Router();

// Specific first
// Create Visitor (POST) - /api/visitors/create
router.post("/create", createVisitor);

// Get All Visitors (GET) - /api/visitors/list
router.get("/list", getVisitors);

// Dynamic last
// Get Single Visitor by ID (GET) - /api/visitors/:id
// router.get("/:id", getVisitorById);

// Update Visitor (PUT) - /api/visitors/update/:id
// router.put("/update/:id", updateVisitor);

// Delete Visitor (DELETE) - /api/visitors/delete/:id
// router.delete("/delete/:id", deleteVisitor);

export default router;

