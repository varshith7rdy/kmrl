import express from "express";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";
import { processFile, getDocuments, downloadFile } from "../controllers/fileController.js";

const router = express.Router();

// File upload and processing route
router.post("/process-file", uploadMiddleware, processFile);

// Get all processed documents
router.get("/documents", getDocuments);

// Download original file
router.get("/download/:id", downloadFile);

export default router;
