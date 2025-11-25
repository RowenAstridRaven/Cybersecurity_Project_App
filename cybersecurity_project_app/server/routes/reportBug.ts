// server/routes/reportBug.ts
import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { db } from '../db';

const router = Router();

// Configure Multer storage options.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in the "uploads" folder.
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    // Prepend a timestamp to minimize file name collisions.
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Use upload.fields to expect a field named "screenshots" with up to 10 files.
// Cast the middleware to the proper type to help resolve overload issues.
const screenshotsMiddleware = upload.fields([{ name: 'screenshots', maxCount: 10 }]) as unknown as (req: Request, res: Response, next: (err?: any) => void) => void;

router.post('/', screenshotsMiddleware, async (req: Request, res: Response) => {
  try {
    // Extract form fields (the client sends these keys)
    const { description, occurredAt, pageAffected, contactInfo } = req.body;
    
    // With upload.fields, req.files is an object keyed by field name.
    const files = (req.files as { screenshots?: Express.Multer.File[] })?.screenshots || [];

    // Validate required fields.
    if (!description || !occurredAt || !pageAffected) {
      return res.status(400).json({ error: 'Missing required fields: description, occurredAt, or pageAffected.' });
    }

    // Map uploaded files to filenames and stringify.
    const screenshots = files.map(file => file.filename);
    const screenshotsJSON = JSON.stringify(screenshots);

    // Insert the bug report into the database.
    const result = await db.run(
      `INSERT INTO bug_reports (description, when_happened, page, contact, screenshots)
       VALUES (?, ?, ?, ?, ?)`,
      description,
      occurredAt,
      pageAffected,
      contactInfo || null,
      screenshotsJSON
    );

    res.json({ message: 'Bug report submitted successfully!', id: result.lastID });
  } catch (error: any) {
    console.error('Error inserting bug report:', error.message);
    res.status(500).json({ error: 'Failed to store bug report', detail: error.message });
  }
});

export default router;
