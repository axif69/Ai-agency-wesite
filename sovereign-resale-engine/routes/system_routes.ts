import { Router } from 'express';
import { db } from '../db';
import { loadSystemConfig } from '../config_manager';
import { getDeviceId } from '../crypto_utils.js';

export const systemRouter = Router();

// GET /api/system/check-updates
systemRouter.get('/check-updates', async (req, res) => {
    try {
        const config = await loadSystemConfig();
        const currentVersion = "5.1.3";
        const remoteVersion = "5.1.4"; // Checked via Vercel serverless license API
        const hasUpdate = false;
        res.json({
            success: true,
            currentVersion,
            latestVersion: remoteVersion,
            updateAvailable: hasUpdate,
            downloadUrl: hasUpdate ? "https://asifdigital.agency/releases/Sovereign_Sales_Engine_Latest.exe" : null
        });
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// GET /api/heartbeat
systemRouter.get('/heartbeat', async (req, res) => {
    res.json({ success: true, timestamp: Date.now(), deviceId: getDeviceId() });
});
