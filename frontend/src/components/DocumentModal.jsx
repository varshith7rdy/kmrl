import React from 'react';

const DocumentModal = ({ document, isOpen, onClose }) => {
  if (!isOpen || !document) return null;

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

  const getCategoryColor = (category) => {
    const colors = {
      'Safety': 'bg-red-100 text-red-800 border-red-200',
      'Finance': 'bg-green-100 text-green-800 border-green-200',
      'HR': 'bg-blue-100 text-blue-800 border-blue-200',
      'Engineering': 'bg-purple-100 text-purple-800 border-purple-200',
      'Reports': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Legal': 'bg-gray-100 text-gray-800 border-gray-200',
      'Internal': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Other': 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return colors[category] || colors['Other'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-500',
      'Medium': 'bg-yellow-500',
      'Low': 'bg-green-500'
    };
    return colors[priority] || colors['Low'];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{document.filename}</h2>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(document.category)}`}>
                  {document.category}
                </span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(document.priority)}`}></div>
                  <span className="text-blue-100">{document.priority} Priority</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold ml-4"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Document Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">File Details</h3>
              <p className="text-sm text-gray-600">Size: {document.size ? `${Math.round(document.size / 1024)} KB` : 'Unknown'}</p>
              <p className="text-sm text-gray-600">Type: {document.filename?.split('.').pop()?.toUpperCase() || 'Unknown'}</p>
              <p className="text-sm text-gray-600">Uploaded: {new Date(document.uploadedAt).toLocaleString()}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Processing Status</h3>
              <p className="text-sm text-green-600">✓ Text Extraction Complete</p>
              <p className="text-sm text-green-600">✓ AI Analysis Complete</p>
              <p className="text-sm text-green-600">✓ Categorization Complete</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Department Assignment</h3>
              <p className="text-sm text-gray-600">Assigned to: <span className="font-medium">{document.category} Department</span></p>
              <p className="text-sm text-gray-600">Priority Level: <span className="font-medium">{document.priority}</span></p>
            </div>
          </div>

          {/* AI Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 AI Analysis Summary</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {document.analysis || 'No analysis available'}
              </p>
            </div>
          </div>

          {/* Extracted Text */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📄 Extracted Content</h3>
            <div className="bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {document.extractedText || 'No text content available'}
              </pre>
            </div>
          </div>

          {/* Key Information */}
          {document.keyPoints && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🔑 Key Points</h3>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {document.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm">{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Items */}
          {document.actionItems && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">⚡ Action Items</h3>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {document.actionItems.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
          <div className="text-sm text-gray-600">
            Document ID: {document.id}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Original
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
