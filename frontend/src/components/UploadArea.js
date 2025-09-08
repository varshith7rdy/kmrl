import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';

const UploadArea = ({ onUploadSuccess, onError }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onError(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    onError(null);
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
      onError('Please select a file first');
      return;
    }

    setUploading(true);
    onError(null);

    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await axios.post('/process-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUploadSuccess(response.data.metadata);
      setSelectedFile(null);
    } catch (err) {
      console.error('Upload error:', err);
      onError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h2>
      
      {/* File Drop Area */}
      <div
        className={`upload-area rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <Upload className={`mx-auto h-12 w-12 mb-4 ${dragOver ? 'text-blue-500' : 'text-gray-400'}`} />
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

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
      >
        {uploading ? (
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
    </div>
  );
};

export default UploadArea;
