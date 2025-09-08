import { main } from "../services/ocrService.js";
import { categorizeAndPrioritize } from "../services/categorizeService.js";
import { uploadFileToAzure } from "../services/azureService.js";
import { sendNotification } from "../services/notificationService.js";

let metadataDB = []; // in-memory metadata storage

export const processFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });

  try {
    const { path: localFilePath, originalname } = req.file;

    // 1. OCR / text extraction
    const textContent = await main(localFilePath);

    // 2. Categorize + priority
    const { category, priority } = categorizeAndPrioritize(textContent);

    // 3. Upload file to Azure
    const { blobName, uniqueId, url } = await uploadFileToAzure(localFilePath, originalname);

    // 4. Save metadata separately
    const metadata = {
      id: uniqueId,
      fileName: originalname,
      blobName,
      azureUrl: url,
      category,
      priority,
      analysisText: textContent.substring(0, 200) + "...",
      uploadedAt: new Date()
    };
    metadataDB.push(metadata);

    // 5. Send notification
    const notification = sendNotification(metadata);

    // Optionally remove local file
    // fs.unlinkSync(localFilePath);

    res.status(200).json({ 
      success: true, 
      metadata,
      notification: notification.message
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "File processing failed." });
  }
};

// Fetch metadata list
export const getAllDocuments = (req, res) => {
  const sortedDocs = metadataDB.sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  res.json(sortedDocs);
};

// Fetch single document with metadata and Azure URL
export const getDocumentById = (req, res) => {
  const { id } = req.params;
  const doc = metadataDB.find(d => d.id === id);
  if (!doc) return res.status(404).json({ success: false, message: "Document not found." });

  res.json(doc);
};
