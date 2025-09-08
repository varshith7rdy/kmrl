# KMRL Frontend - React Application

A modern React application for the KMRL Smart Document Automation system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Application header
│   ├── UploadSection.jsx   # File upload interface
│   ├── DocumentsList.jsx  # Documents list view
│   └── DocumentCard.js     # Individual document card
├── context/            # React Context providers
│   └── DocumentContext.js # Document state management
├── hooks/              # Custom React hooks
│   └── useFileUpload.js   # File upload utilities
├── utils/              # Utility functions
│   └── constants.js    # Application constants
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Features

- **Modern React Architecture**: Uses hooks, context, and functional components
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **File Upload**: Drag & drop with validation
- **Real-time Updates**: Context-based state management
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: User-friendly loading indicators
- **Filtering**: Category-based document filtering

## 🔧 Technologies

- React 18
- Tailwind CSS 3
- Lucide React (icons)
- Axios (HTTP client)
- React Context API

## 📱 Components

### Header
- Application branding
- Navigation elements

### UploadSection
- Drag & drop file upload
- File validation
- Upload progress
- Success/error feedback

### DocumentsList
- Document filtering
- Loading states
- Empty states
- Responsive grid

### DocumentCard
- Document metadata display
- Action buttons (view/download)
- Priority and category badges

## 🎯 Usage

The application connects to the backend API running on `http://localhost:5000` via the proxy configuration in `package.json`.

### Environment Setup

The React app automatically proxies API requests to the backend server. No additional configuration needed for development.

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files that can be served statically.
