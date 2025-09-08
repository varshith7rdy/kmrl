import React from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import DocumentsList from './components/DocumentsList';
import { DocumentProvider } from './context/DocumentContext';

function App() {
  return (
    <DocumentProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <UploadSection />
            <DocumentsList />
          </div>
        </div>
      </div>
    </DocumentProvider>
  );
}

export default App;
