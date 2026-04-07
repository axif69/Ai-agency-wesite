import { personalizeOutreach, personalizeDeepOutreach } from './personalizer.ts';

async function verifyIdentity() {
    console.log("🧪 Verification: Dry Run Email Generation...");
    
    const company = "Test Engineering Solutions Dubai";
    const about = "We are a leading provider of HVAC and MEP engineering services in the UAE. Our team is dedicated to high-quality project delivery.";
    const analysis = {
        notes: "HVAC and MEP engineering specialist based in Dubai.",
        services: "HVAC, MEP, Engineering, Contracting",
        websiteContent: about
    };

    try {
        console.log("\n--- Standard Outreach Sample ---");
        const standard = await personalizeOutreach(company, about);
        console.log(standard);

        console.log("\n--- Deep Outreach Sample ---");
        const deep = await personalizeDeepOutreach(company, analysis);
        console.log(deep);

        console.log("\n--- Check for Tri-Angle / Instructions ---");
        const leaked = standard.includes('AGENT INSTRUCTION') || deep.includes('AGENT INSTRUCTION');
        const oldBrand = standard.includes('Tri-Angle') || deep.includes('Tri-Angle') || standard.includes('drive.google.com');
        
        if (leaked) console.error("❌ FAILURE: Internal instructions LEAKED into email body.");
        else console.log("✅ SUCCESS: No internal instructions found.");

        if (oldBrand) console.error("❌ FAILURE: Legacy 'Tri-Angle' or old drive links still present.");
        else console.log("✅ SUCCESS: No legacy branding found.");

    } catch (e: any) {
        console.error("❌ Verification Failed:", e.message);
    }
}

verifyIdentity();
