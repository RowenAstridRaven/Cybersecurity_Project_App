// server/routes/cybercrime.ts
import express from 'express';
import { getCyberSecurityTopics, getCyberSecurityDetails } from '../db';

const router = express.Router();

// Route to get all cybersecurity topics
router.get('/topics', async (req, res) => {
  try {
    const topics = await getCyberSecurityTopics();
    console.log('Fetched topics:', topics); // Debugging log
    res.json(topics);
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Failed to fetch cybersecurity topics' });
  }
});
// Route to get specific topic details
router.get('/summary/:topic', async (req, res) => {
  try {
    const topic = req.params.topic;
    const details = await getCyberSecurityDetails(topic);

    if (!details) {
      return res.status(404).json({ error: `No summary available for '${topic}'` });
    }

    res.json(details);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cybersecurity details' });
  }
});

export default router;
