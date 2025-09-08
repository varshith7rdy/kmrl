import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fileRoutes from "./routes/fileRoutes.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", fileRoutes);

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
} else {
  // Development mode - just serve API
  app.get("/", (req, res) => {
    res.json({ 
      message: "KMRL Backend API", 
      frontend: "Run 'npm start' in the frontend directory for development" 
    });
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`Frontend available at http://localhost:${PORT}`);
  } else {
    console.log(`API available at http://localhost:${PORT}/api`);
    console.log(`Run React frontend separately: cd frontend && npm start`);
  }
});
