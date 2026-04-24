import { sendEmail } from './gmail_service.js';

async function notifyUser() {
    console.log("📨 Sending completion notification to Asif...");
    const result = await sendEmail(
        "asifk199707@gmail.com", 
        "Sovereign Resale Engine: [STATUS - ONLINE & OPTIMIZED]", 
        "Hey Asif,\n\nThe Sovereign Resale Engine is now running perfectly in the background.\n\nUpdates Completed:\n1. Fixed the 'yapping' - Pitch is now cold, clinical, and direct.\n2. Enforced 2-sentence limits to stop salesy fluff.\n3. Mechanism clearly explains 24/7 autonomous discovery and one-time investment.\n4. Leads aligned and reset for fresh outreach.\n\nThe system is now executing the 'Sovereign Swarm' logic.\n\nBest,\nYour AI Agent"
    );
    
    if (result.success) {
        console.log("✅ Notification email sent successfully.");
    } else {
        console.error("❌ Failed to send notification email.");
    }
}

notifyUser().catch(console.error);
