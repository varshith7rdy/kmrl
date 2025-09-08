import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [localError, setLocalError] = useState(null);
  
  const { uploadDocument, loading } = useDocuments();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setLocalError(null);
      setUploadResult(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setLocalError(null);
      setUploadResult(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setLocalError('Please select a file first');
      return;
    }

    try {
      setLocalError(null);
      const result = await uploadDocument(selectedFile);
      setUploadResult(result.metadata);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setLocalError(error.message);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setLocalError(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h2>
        
        {/* File Drop Area */}
        <div
          className={`upload-area rounded-lg p-8 text-center cursor-pointer ${
            dragOver ? 'dragover' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <Upload className={`mx-auto h-12 w-12 mb-4 ${
            dragOver ? 'text-primary-500' : 'text-gray-400'
          }`} />
          <p className="text-sm text-gray-600 mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Supports PDF, JPG, PNG, DOCX, TXT
          </p>
        </div>

        <input
          id="fileInput"
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.docx,.txt"
          onChange={handleFileSelect}
        />

        {selectedFile && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Selected: {selectedFile.name}
            </p>
            <p className="text-xs text-blue-600">
              Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {loading ? (
              <>
                <Clock className="animate-spin h-4 w-4 mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload & Process
              </>
            )}
          </button>
          
          {(selectedFile || uploadResult) && (
            <button
              onClick={resetUpload}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {localError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <p className="text-sm text-red-800">{localError}</p>
            </div>
          </div>
        )}

        {uploadResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <p className="text-sm font-medium text-green-800">Upload Successful!</p>
            </div>
            <div className="space-y-2 text-sm text-green-700">
              <p><strong>Category:</strong> {uploadResult.category}</p>
              <p><strong>Priority:</strong> {uploadResult.priority}</p>
              <p><strong>Analysis:</strong> {uploadResult.analysisText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
