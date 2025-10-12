import { Router } from "express";
import {
  createTransactionController,getAllTransactionController,getTransactionByIdController,duplicateTransactionController,updateTransactionController,deleteTransactionController,
  bulkDeleteTransactionController,bulkTransactionController,
  scanReceiptController
} from "../controllers/transaction.controller";
import { upload } from "../config/cloudinary.config";

const transactionRoutes = Router();

transactionRoutes.post("/create", createTransactionController);
transactionRoutes.post("/bulk-transaction", bulkTransactionController);
transactionRoutes.get("/all", getAllTransactionController);
transactionRoutes.get("/:id", getTransactionByIdController);
transactionRoutes.put("/duplicate/:id", duplicateTransactionController);
transactionRoutes.put("/update/:id", updateTransactionController);
transactionRoutes.delete("/delete/:id", deleteTransactionController);
transactionRoutes.delete("/bulk-delete", bulkDeleteTransactionController);
transactionRoutes.post(
  "/scan-receipt",
  upload.single("receipt"),
  scanReceiptController
);

export default transactionRoutes;