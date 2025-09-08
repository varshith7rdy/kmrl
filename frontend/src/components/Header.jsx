import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center group">
            <div className="relative">
              <FileText className="h-10 w-10 text-blue-600 mr-4 group-hover:text-blue-700 transition-colors duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                KMRL Document Automation
              </h1>
              <p className="text-sm text-gray-600 mt-1">Powered by AI • Smart Processing • Instant Analysis</p>
            </div>
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Header;
