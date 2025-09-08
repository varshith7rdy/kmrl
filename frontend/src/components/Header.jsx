import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">KMRL Document Automation</h1>
          </div>
          <div className="text-sm text-gray-500">
            Smart Document Processing & Analysis
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
