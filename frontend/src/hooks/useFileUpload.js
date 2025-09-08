import { useState } from 'react';

export const useFileUpload = () => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event, callback) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && callback) {
      callback(file);
    }
  };

  const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not supported. Please upload PDF, JPG, PNG, DOCX, or TXT files.');
    }
    
    if (file.size > maxSize) {
      throw new Error('File size too large. Please upload files smaller than 10MB.');
    }
    
    return true;
  };

  return {
    dragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    validateFile
  };
};
