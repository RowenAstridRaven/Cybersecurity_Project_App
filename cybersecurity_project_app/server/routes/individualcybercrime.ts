import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { db } from '../db';

const router = Router();

// Configure Multer for screenshot uploads.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Middleware for handling a single file upload under "screenshot".
const screenshotMiddleware = upload.single('screenshot') as unknown as (req: Request, res: Response, next: (err?: any) => void) => void;

// POST: Submit an individual cybercrime report.
router.post('/', screenshotMiddleware, async (req: Request, res: Response) => {
  try {
    const {type, device_or_site, description } = req.body;
    const file = req.file; // Uploaded screenshot

    // Validate required fields.
    if (!type || !device_or_site) {
      return res.status(400).json({ error: 'Missing required fields: type or device_or_site.' });
    }

    // Store uploaded file name if provided.
    const screenshot = file ? file.filename : null;

    // Insert report into the database.
    const result = await db.run(
      `INSERT INTO individual_cybercrime_reports (type, device_or_site, screenshot, description)
       VALUES (?, ?, ?, ?)`,
      type,
      device_or_site,
      screenshot,
      description || null
    );

    res.json({ message: 'Cybercrime report submitted successfully!', id: result.lastID });
  } catch (error: any) {
    console.error('Error submitting cybercrime report:', error.message);
    res.status(500).json({ error: 'Failed to submit cybercrime report' });
  }
});

export default router;
