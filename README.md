# KMRL Smart Document Automation - MVP

A hackathon project for Kochi Metro Rail Limited (KMRL) that automates document processing with OCR, AI-powered summarization, and intelligent categorization.

## 🚀 Quick Start

### Backend Setup
1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your credentials:
```env
AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string
AZURE_CONTAINER_NAME=documents
GEMINI_API_KEY=your_gemini_api_key
```

3. Start the server:
```bash
node server.js
```

4. Open your browser and go to `http://localhost:5000`

### Frontend Setup (React - Optional)
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
kmrl/
├── controllers/          # Request handlers
├── middlewares/         # Upload middleware
├── routes/             # API routes
├── services/           # Core business logic
│   ├── ocrService.js   # OCR & text extraction
│   ├── categorizeService.js  # Document categorization
│   └── azureService.js # Cloud storage
├── utils/              # Utility functions
├── public/             # Static HTML dashboard
├── frontend/           # React application (optional)
└── uploads/            # Temporary file storage
```

## 🛠 Features

### ✅ Implemented
- **Document Upload**: Drag & drop or click to upload
- **OCR Processing**: Extract text from images, Word docs, and text files
- **AI Summarization**: Gemini API integration for intelligent analysis
- **Categorization**: Auto-categorize documents by content
- **Cloud Storage**: Azure Blob Storage integration
- **Dashboard**: Clean web interface for file management
- **Priority Detection**: Automatic priority assignment

### 🔄 In Progress
- PDF processing (currently skipped)
- Enhanced categorization for KMRL departments

### 📋 Supported File Types
- **Images**: JPG, PNG (OCR with Tesseract.js)
- **Documents**: DOCX (text extraction)
- **Text**: TXT files
- **PDFs**: Coming soon

## 🎯 Demo Flow

1. Upload a document (safety circular, invoice, etc.)
2. System extracts text using OCR
3. AI analyzes and summarizes content
4. Document is categorized and prioritized
5. Results displayed in dashboard
6. Files stored securely in Azure

## 🔧 Environment Variables

```env
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...
AZURE_CONTAINER_NAME=documents
GEMINI_API_KEY=AIzaSy...
```

## 📊 API Endpoints

- `POST /api/process-file` - Upload and process document
- `GET /api/documents` - List all processed documents
- `GET /api/documents/:id` - Get specific document details

## 🏗 Tech Stack

**Backend:**
- Node.js + Express
- Tesseract.js (OCR)
- Gemini API (AI Analysis)
- Azure Blob Storage
- Multer (File uploads)

**Frontend:**
- HTML/CSS/JavaScript (Simple dashboard)
- React.js (Advanced dashboard - optional)
- Tailwind CSS (Styling)

## 🚨 Troubleshooting

1. **Upload fails**: Check Azure credentials in `.env`
2. **OCR not working**: Ensure Tesseract.js is properly installed
3. **AI analysis fails**: Verify Gemini API key
4. **Files not displaying**: Check Azure container permissions

## 👥 Team

Built for SIH 2025 hackathon - Smart Document Automation for KMRL
