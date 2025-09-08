import React from 'react';
import { Eye, Download, FileText, Calendar, Tag } from 'lucide-react';

const DocumentCard = ({ document }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'finance': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'hr': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'safety': return 'text-red-600 bg-red-100 border-red-200';
      case 'engineering': return 'text-green-600 bg-green-100 border-green-200';
      case 'reports': return 'text-indigo-600 bg-indigo-100 border-indigo-200';
      case 'legal': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'internal': return 'text-slate-600 bg-slate-100 border-slate-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const handleViewDocument = () => {
    if (document.azureUrl) {
      window.open(document.azureUrl, '_blank');
    }
  };

  const handleDownloadDocument = () => {
    if (document.azureUrl) {
      const link = document.createElement('a');
      link.href = document.azureUrl;
      link.download = document.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-3">
            <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {document.fileName}
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(document.category)}`}>
              <Tag className="h-3 w-3 mr-1" />
              {document.category}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(document.priority)}`}>
              {document.priority} Priority
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {document.analysisText}
          </p>
          
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            Uploaded: {new Date(document.uploadedAt).toLocaleString()}
          </div>
        </div>
        
        <div className="flex items-center space-x-1 ml-4 flex-shrink-0">
          <button
            onClick={handleViewDocument}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            title="View Document"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={handleDownloadDocument}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
