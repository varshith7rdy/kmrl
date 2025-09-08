import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';
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
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover-lift hover-glow transition-all duration-300">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-3">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
        </div>
        
        {/* Enhanced File Drop Area */}
        <div
          className={`relative rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
            dragOver 
              ? 'border-blue-400 bg-blue-50/50 scale-105' 
              : 'border-gray-300 bg-gray-50/30 hover:border-blue-300 hover:bg-blue-50/30'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
            dragOver 
              ? 'bg-blue-100 scale-110' 
              : 'bg-gray-100 hover:bg-blue-50'
          }`}>
            <Upload className={`h-10 w-10 transition-colors duration-300 ${
              dragOver ? 'text-blue-600' : 'text-gray-500'
            }`} />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, JPG, PNG, DOCX, TXT files
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              {['PDF', 'JPG', 'PNG', 'DOCX', 'TXT'].map((type) => (
                <span key={type} className="px-2 py-1 bg-white/60 text-xs font-medium text-gray-600 rounded-full border">
                  {type}
                </span>
              ))}
            </div>
          </div>
          
          {/* Animated background */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        <input
          id="fileInput"
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.docx,.txt"
          onChange={handleFileSelect}
        />

        {selectedFile && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 animate-scale-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 truncate max-w-48">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-blue-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 button-bounce shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Upload & Process
              </>
            )}
          </button>
          
          {(selectedFile || uploadResult) && (
            <button
              onClick={resetUpload}
              className="px-6 py-3 text-gray-600 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 button-bounce font-medium"
            >
              Reset
            </button>
          )}
        </div>

        {localError && (
          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl animate-slide-up">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-sm font-medium text-red-800">{localError}</p>
            </div>
          </div>
        )}

        {uploadResult && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-scale-in">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-green-800">Upload Successful!</p>
                <p className="text-sm text-green-600">Document processed and categorized</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/60 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</p>
                <p className="text-sm font-semibold text-gray-800">{uploadResult.category}</p>
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</p>
                <p className="text-sm font-semibold text-gray-800">{uploadResult.priority}</p>
              </div>
            </div>
            <div className="bg-white/60 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">AI Analysis</p>
              <p className="text-sm text-gray-700 line-clamp-3">{uploadResult.analysisText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
