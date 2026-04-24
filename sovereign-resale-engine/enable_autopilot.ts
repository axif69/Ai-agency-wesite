import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'sovereign_resale_v5.db');

const db = new sqlite3.Database(dbPath);

console.log("✈️ Enabling Full Autopilot Mode for Sovereign Resale Engine...");

db.serialize(() => {
    // Set auto_discovery to true
    db.run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?", ["auto_discovery", "true", "true"], (err) => {
        if (err) console.error("❌ Error setting auto_discovery:", err.message);
        else console.log("✅ Auto-Discovery: ENABLED");
    });

    // Ensure AI Model is the powerful 70b (with fallback handling in worker)
    db.run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?", ["ai_model", "llama-3.3-70b-versatile", "llama-3.3-70b-versatile"], (err) => {
        if (err) console.error("❌ Error setting ai_model:", err.message);
        else console.log("✅ AI Model: llama-3.3-70b-versatile (Autopilot Optimized)");
    });

    // Set Sent Limit to 250 (Max Safe)
    db.run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?", ["daily_sent_limit", "250", "250"], (err) => {
        if (err) console.error("❌ Error setting limit:", err.message);
        else console.log("✅ Daily Sent Limit: 250");
    });

    db.close();
});
