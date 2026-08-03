import { Router } from 'express';
import { db } from '../db';

export const leadsRouter = Router();

// GET /api/leads — Fetch all leads with stage counts
leadsRouter.get('/leads', async (req, res) => {
    try {
        db.all("SELECT * FROM leads ORDER BY id DESC", [], (err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            res.json(rows || []);
        });
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// GET /api/leads/stats — Pipeline stage metrics
leadsRouter.get('/leads/stats', async (req, res) => {
    try {
        db.all("SELECT status, is_relevant, COUNT(*) as count FROM leads GROUP BY status, is_relevant", [], (err, rows) => {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            res.json({ success: true, stats: rows });
        });
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message });
    }
});
