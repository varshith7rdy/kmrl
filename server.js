import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fileRoutes from "./routes/fileRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files
app.use(express.static(__dirname));

// Use routes
app.use("/", fileRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
