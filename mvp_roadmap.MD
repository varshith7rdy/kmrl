# 🚇 Smart Document Automation for KMRL – MVP Roadmap

## 🎯 Goal
Build a **Minimum Viable Product (MVP)** that demonstrates the **core functionality** of our solution:
1. Ingest documents (PDFs / scans)
2. Extract text (English + Malayalam)
3. Summarize automatically
4. Categorize by department (HR, Finance, Safety, Engineering)
5. Display results in a simple dashboard
6. (Optional) Send a basic notification/alert

---

## 🛠 Tech Stack (MVP)
- **Backend**
  - Python (Flask / FastAPI)
  - Libraries: Tesseract OCR, Hugging Face Transformers, spaCy (NER), Pandas
- **Frontend**
  - React.js (simple UI for upload & results)
  - Tailwind CSS for styling (optional)
- **Database**
  - SQLite or PostgreSQL (store extracted docs + metadata)
- **Deployment**
  - Localhost / simple cloud instance (Heroku, Render, or local server)

---

## 📌 Features (MVP Scope)

### 1. Document Upload
- UI to upload PDF or image (scan).
- Store uploaded file in backend.

### 2. OCR + Text Extraction
- Use **Tesseract** for OCR.
- Extract both English + Malayalam text.
- Show raw extracted text on dashboard.

### 3. Summarization
- Use **Hugging Face summarization model** (e.g., `facebook/bart-large-cnn` or `google/pegasus`).
- Generate **short summary (3–5 sentences)**.
- Display alongside original text.

### 4. Categorization (Auto-tagging)
- Simple keyword/entity-based classification:
  - If contains "invoice, payment" → **Finance**
  - If contains "training, safety" → **HR/Safety**
  - If contains "maintenance, engineering" → **Engineering**
- Show category tag on dashboard.

### 5. Dashboard
- React.js dashboard with:
  - File upload button
  - Extracted text section
  - Summary section
  - Category tag
- Simple & clean design (no need for advanced graphs yet).

### 6. Notifications (Optional)
- When a new document is uploaded:
  - Print in console:  
    `"🚨 New Safety Circular uploaded – assigned to HR & Operations."`
  - (Optional) Send email/Slack message using API.

---

## 🔜 Features to Add Later (Not in MVP)
- Predictive insights & trend analysis
- Full Malayalam-English translation pipeline
- Integration with Maximo, SharePoint, WhatsApp
- Role-based dashboards
- Knowledge graph & semantic search
- Strong encryption & security layers

---

## ✅ Hackathon Demo Flow
1. Upload a **sample safety circular (PDF in Malayalam/English)**.  
2. OCR extracts text → show raw text.  
3. Summarizer produces a short summary.  
4. Auto-categorization tags as **Safety/HR**.  
5. Dashboard displays: Original text, summary, and category.  
6. Console/alert shows:  
   `"🚨 Safety Circular uploaded – sent to HR & Operations."`  

---

## 👥 Team Task Split
- **Backend Dev 1**: Set up Flask/FastAPI + OCR pipeline.  
- **Backend Dev 2**: Add summarization + categorization logic.  
- **Frontend Dev**: Build React.js dashboard (upload + display results).  
- **Integrator**: Connect backend → frontend → basic DB storage.  

---
