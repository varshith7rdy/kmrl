import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { processFile, getAllDocuments, getDocumentById } from "../controllers/fileController.js";

const router = express.Router();

router.post("/process-file", upload.single("document"), processFile);
router.get("/documents", getAllDocuments);
router.get("/documents/:id", getDocumentById);

export default router;
