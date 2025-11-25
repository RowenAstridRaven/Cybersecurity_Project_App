import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from 'fs';
import path from 'path';
import { initializeDB } from './db';
import accountRoutes from './routes/account';
import articleRoutes from './routes/articles';
import reportBugRoutes from './routes/reportBug';
import cyberCrimeRoutes from './routes/cybercrime';
import adminRoutes from './routes/admin';
import individualCyberCrime from './routes/individualcybercrime';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Initialize the SQLite database, then mount routes and start the server
initializeDB()
  .then(() => {
    console.log("Database initialized successfully.");

  // Routes
  app.use('/api/account', accountRoutes);
  app.use('/api/articles', articleRoutes);
  app.use('/api/report-bug', reportBugRoutes);
  app.use('/api/cybercrime', cyberCrimeRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/indiviual',individualCyberCrime)
  
  // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })

  .catch((err) => {
    console.error("Failed to initialize database:", err);
  });