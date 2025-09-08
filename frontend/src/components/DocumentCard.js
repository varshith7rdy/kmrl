import React from 'react';
import { FileText, Download, Eye, Calendar, User, AlertCircle, Clock, Zap } from 'lucide-react';

const DocumentCard = ({ document, onView, onDownload }) => {
  const getCategoryBadge = (category) => {
    const colors = {
      'HR': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg',
      'Finance': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg', 
      'Safety': 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg',
      'Engineering': 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg',
      'Reports': 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg',
      'Legal': 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg',
      'Internal': 'bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-lg',
      'Other': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colors[category] || colors['Other']} hover:scale-105 transition-transform duration-200`}>
        {category}
      </span>
    );
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-500',
      'Medium': 'bg-yellow-500',
      'Low': 'bg-green-500'
    };
    return colors[priority] || colors['Low'];
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download/${document.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = document.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 p-6 hover-lift hover-glow stagger-item relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                {document.fileName}
              </h3>
              <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {document.size}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(document.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getCategoryBadge(document.category)}
            <div className={`w-3 h-3 rounded-full ${getPriorityColor(document.priority)}`}></div>
          </div>
        </div>
      
        {/* Enhanced AI Summary */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Zap className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">AI Analysis</span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {document.analysisText || document.analysis || 'AI analysis will appear here after processing...'}
          </p>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onView(document)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center text-sm font-semibold shadow-lg hover:shadow-xl button-bounce group/btn"
          >
            <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            View Details
          </button>
          <button
            onClick={() => onDownload(document.id)}
            className="bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center text-sm font-semibold button-bounce group/btn"
          >
            <Download className="h-4 w-4 mr-1 group-hover/btn:scale-110 transition-transform" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
