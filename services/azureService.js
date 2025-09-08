import { containerClient } from "../utils/azureConfig.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

/**
 * Upload a file to Azure Blob Storage
 * @param {string} localFilePath 
 * @param {string} originalName 
 * @returns {string} unique ID of the file
 */
export async function uploadFileToAzure(localFilePath, originalName) {
  const uniqueId = uuidv4(); // generate a unique ID
  const blobName = `${uniqueId}-${originalName}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadFile(localFilePath);

  return { blobName, uniqueId, url: blockBlobClient.url };
}

/**
 * Download file from Azure by blob name
 * @param {string} blobName 
 * @param {string} downloadPath 
 */
export async function downloadFileFromAzure(blobName, downloadPath) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const downloadResponse = await blockBlobClient.downloadToFile(downloadPath);
  return downloadPath;
}
