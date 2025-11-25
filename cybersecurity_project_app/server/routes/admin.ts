// server/routes/admin.ts
import express from 'express';
const router = express.Router();

let maintenanceMode = false;

// GET maintenance status
router.get('/status', (req, res) => {
  res.json({ maintenance: maintenanceMode });
});

// POST update maintenance mode (expects { mode: boolean })
router.post('/maintenance', (req, res) => {
  const { mode } = req.body;
  maintenanceMode = mode;
  res.json({ message: `Maintenance mode ${maintenanceMode ? 'enabled' : 'disabled'}` });
});

// Optional: Middleware to block non-admin endpoints when in maintenance mode.
router.use((req, res, next) => {
  if (maintenanceMode) {
    return res.status(503).json({ message: 'Service under maintenance.' });
  }
  next();
});

export default router;
