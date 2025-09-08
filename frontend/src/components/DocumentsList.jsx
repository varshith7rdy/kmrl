import React, { useState } from 'react';
import { FileText, Filter, Eye, Download } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import DocumentCard from './DocumentCard';

const DocumentsList = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const { documents, loading, error } = useDocuments();

  const filteredDocuments = documents.filter(doc => 
    filterCategory === 'all' || doc.category?.toLowerCase() === filterCategory.toLowerCase()
  );

  if (loading && documents.length === 0) {
    return (
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading documents...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Processed Documents ({filteredDocuments.length})
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="finance">Finance</option>
                <option value="hr">HR</option>
                <option value="safety">Safety</option>
                <option value="engineering">Engineering</option>
                <option value="reports">Reports</option>
                <option value="legal">Legal</option>
                <option value="internal">Internal</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {filteredDocuments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium mb-2">No documents found</p>
              <p className="text-sm">
                {filterCategory === 'all' 
                  ? "Upload your first document to get started!" 
                  : `No documents in the ${filterCategory} category.`
                }
              </p>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))
          )}
        </div>

        {loading && documents.length > 0 && (
          <div className="p-4 text-center border-t border-gray-200">
            <div className="inline-flex items-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
              Refreshing...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsList;
