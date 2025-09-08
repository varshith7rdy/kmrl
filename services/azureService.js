// import { containerClient } from "../utils/azureConfig.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

/**
 * Upload a file to Azure Blob Storage
 * @param {string} localFilePath 
 * @param {string} originalName 
 * @returns {string} unique ID of the file
 */
export async function uploadToAzure(localFilePath, originalName) {
  try {
    // For demo purposes, return null to skip Azure upload
    console.log(`Azure upload skipped for demo: ${originalName}`);
    return null;
  } catch (error) {
    console.warn("Azure upload failed:", error.message);
    return null;
  }
}

export async function uploadFileToAzure(localFilePath, originalName) {
  try {
    // For demo purposes, return mock data
    const uniqueId = uuidv4();
    return { 
      blobName: `${uniqueId}-${originalName}`, 
      uniqueId, 
      url: `https://demo.blob.core.windows.net/documents/${uniqueId}-${originalName}` 
    };
  } catch (error) {
    console.warn("Azure upload failed:", error.message);
    return null;
  }
}

/**
 * Download file from Azure by blob name
 * @param {string} blobName 
 * @param {string} downloadPath 
 */
export async function downloadFileFromAzure(blobName, downloadPath) {
  try {
    // For demo purposes, return the download path
    console.log(`Azure download skipped for demo: ${blobName}`);
    return downloadPath;
  } catch (error) {
    console.warn("Azure download failed:", error.message);
    return null;
  }
}
