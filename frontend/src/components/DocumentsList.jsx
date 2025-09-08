import React, { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import DocumentCard from './DocumentCard';
import DocumentModal from './DocumentModal';

const DocumentsList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { documents, loading, error } = useDocuments();

  const filteredDocuments = documents.filter(doc => 
    !selectedCategory || doc.category?.toLowerCase() === selectedCategory.toLowerCase()
  );

  const handleViewDetails = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const handleDownload = async (documentId) => {
    try {
      const response = await fetch(`/api/download/${documentId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document_${documentId}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (loading && documents.length === 0) {
    return (
      <div className="lg:col-span-2">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover-lift transition-all duration-300">
          <div className="flex flex-col justify-center items-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-gray-700">Processing documents...</p>
              <p className="text-sm text-gray-500 mt-1">AI analysis in progress</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover-lift transition-all duration-300">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Processed Documents</h2>
              <p className="text-sm text-gray-600 mt-1">Smart categorization and AI analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
              >
                <option value="">All Categories</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="Procurement">Procurement</option>
                <option value="HR">HR</option>
                <option value="Legal">Legal</option>
                <option value="Safety">Safety</option>
                <option value="Regulatory">Regulatory</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">
                {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="p-6">
          {!loading && filteredDocuments.length === 0 && (
            <div className="text-center py-16">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-50"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No documents found</h3>
              <p className="text-gray-500 mb-4">
                {selectedCategory ? `No documents in ${selectedCategory} category` : 'Upload your first document to get started'}
              </p>
              <div className="flex justify-center space-x-2">
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">AI Powered</div>
                <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Smart Categorization</div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Instant Processing</div>
              </div>
            </div>
          )}
          {filteredDocuments.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onView={handleViewDetails}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DocumentModal 
        document={selectedDocument}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DocumentsList;
