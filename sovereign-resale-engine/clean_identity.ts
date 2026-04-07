import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const db = new sqlite3.Database('sovereign_v5.db');
const dbGet = promisify(db.get.bind(db));
const dbRun = promisify(db.run.bind(db));

async function cleanIdentity() {
    console.log("🧹 Identity Cleanup: Scrubbing 'Brain Instructions' from Pitch Context...");
    
    try {
        const row: any = await dbGet("SELECT value FROM settings WHERE key = 'PITCH_CONTEXT'");
        if (!row || !row.value) {
            console.log("⚠️ No Pitch Context found to clean.");
            return;
        }

        let pitch = row.value;
        console.log("📋 Current Raw Pitch Length:", pitch.length);

        // Surgery: Keep only the text BEFORE any "AGENT INSTRUCTION" or "AGENT IDENTITY" or "MISSION" headers
        const markers = ["AGENT INSTRUCTION", "AGENT IDENTITY", "MISSION", "CLEANING INSTRUCTION", "RELEVANCE CHECK"];
        let firstMarkerIndex = Infinity;

        markers.forEach(marker => {
            const idx = pitch.indexOf(marker);
            if (idx !== -1 && idx < firstMarkerIndex) {
                firstMarkerIndex = idx;
            }
        });

        if (firstMarkerIndex !== Infinity) {
            const cleanedPitch = pitch.substring(0, firstMarkerIndex).trim().replace(/^-+$/, '').trim();
            console.log("✅ Cleaned Pitch Preview:", cleanedPitch.substring(0, 100) + "...");
            
            await dbRun("UPDATE settings SET value = ? WHERE key = 'PITCH_CONTEXT'", [cleanedPitch]);
            console.log("💾 Database successfully synchronized with clean identity.");
        } else {
            console.log("✨ No instruction markers found in pitch. Already clean!");
        }

        // Also update defaults for the profile URL if it's the Tri-Angle one
        const profileUrlRow: any = await dbGet("SELECT value FROM settings WHERE key = 'COMPANY_PROFILE_URL'");
        if (profileUrlRow && profileUrlRow.value.includes('1T_rHZ6zOWXkOsHso0y2ncHm7rgpg5ol6')) {
            console.log("🚀 Updating Profile URL: Removing Tri-Angle reference...");
            await dbRun("UPDATE settings SET value = ? WHERE key = 'COMPANY_PROFILE_URL'", ['https://asifdigital.agency/portfolio']); 
        }

    } catch (e: any) {
        console.error("❌ Cleanup Failed:", e.message);
    } finally {
        db.close();
    }
}

cleanIdentity();
