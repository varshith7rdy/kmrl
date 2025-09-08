import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { main as performOCR } from "../services/ocrService.js";
import { categorizeDocument } from "../services/categorizeService.js";
import { uploadToAzure } from "../services/azureService.js";
import { sendNotification } from "../services/notificationService.js";

// In-memory storage for demo (replace with database in production)
let processedDocuments = [];

export const processFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const fileId = uuidv4();

    console.log(`Processing file: ${fileName}`);

    // Perform OCR and analysis
    const extractedText = await performOCR(filePath);
    
    // Categorize the document
    const { category, priority, analysis } = await categorizeDocument(extractedText, fileName);

    // Upload to Azure (optional - for production)
    let azureUrl = null;
    try {
      azureUrl = await uploadToAzure(filePath, fileName);
    } catch (azureError) {
      console.warn("Azure upload failed:", azureError.message);
    }

    // Create document record
    const document = {
      id: fileId,
      filename: fileName,
      category,
      priority,
      analysis,
      extractedText,
      azureUrl,
      uploadedAt: new Date().toISOString(),
      filePath: filePath, // Keep local path for download
      size: req.file.size
    };

    // Store in memory
    processedDocuments.push(document);

    // Send notification
    await sendNotification(document);

    // Clean up local file after processing (optional)
    // fs.unlinkSync(filePath);

    res.json({
      success: true,
      document: {
        id: document.id,
        filename: document.filename,
        category: document.category,
        priority: document.priority,
        analysis: document.analysis,
        uploadedAt: document.uploadedAt,
        extractedText: document.extractedText,
        size: document.size
      }
    });

  } catch (error) {
    console.error("File processing error:", error);
    res.status(500).json({ error: "File processing failed" });
  }
};

export const getDocuments = async (req, res) => {
  try {
    res.json({
      success: true,
      documents: processedDocuments.map(doc => ({
        id: doc.id,
        filename: doc.filename,
        category: doc.category,
        priority: doc.priority,
        analysis: doc.analysis,
        uploadedAt: doc.uploadedAt,
        extractedText: doc.extractedText,
        size: doc.size
      }))
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const document = processedDocuments.find(doc => doc.id === id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Check if file exists
    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({ error: "File not found on server" });
    }

    // Set appropriate headers
    res.setHeader('Content-Disposition', `attachment; filename="${document.filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream the file
    const fileStream = fs.createReadStream(document.filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error("File download error:", error);
    res.status(500).json({ error: "File download failed" });
  }
};

export const getDocumentById = (req, res) => {
  const { id } = req.params;
  const doc = processedDocuments.find(d => d.id === id);
  if (!doc) return res.status(404).json({ success: false, message: "Document not found." });

  res.json(doc);
};
