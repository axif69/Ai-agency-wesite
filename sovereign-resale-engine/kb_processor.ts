import * as fs from 'fs';

/**
 * Sovereign Knowledge Base Processor v3.1
 * Extracts text from PDF company profiles for AI context injection.
 * 
 * FIXED: pdf-parse ESM compatibility — uses require() via createRequire for CJS module.
 */
export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
    try {
        // pdf-parse is a CJS module — must use require() for compatibility
        let pdf: any;
        try {
            // Try direct require first (works in tsx/ts-node with CJS interop)
            const mod = await import('pdf-parse');
            pdf = (mod as any).default || mod;
        } catch {
            // Fallback: dynamic require
            const { createRequire } = await import('module');
            const req = createRequire(import.meta.url);
            pdf = req('pdf-parse');
        }
        
        if (typeof pdf !== 'function') {
            // Some builds export { default: fn } — unwrap it
            pdf = pdf.default || pdf;
        }
        
        if (typeof pdf !== 'function') {
            throw new Error('pdf-parse module could not be loaded as a function. Try: npm install pdf-parse@1.1.1');
        }
        
        const data = await pdf(fileBuffer);
        
        if (!data || !data.text || data.text.trim().length === 0) {
            console.error("[KB PROCESSOR] Extracted text is empty.");
            console.error(`[KB PROCESSOR] Pages: ${data?.numpages || 0}`);
            throw new Error("No readable text found in PDF. The PDF may be scanned (image-only) or password-locked.");
        }

        // Advanced cleanup
        let cleanedText = data.text
            .replace(/\0/g, '')
            .replace(/\s+/g, ' ')
            .replace(/[\n\r]+/g, ' ')
            .replace(/[^\x20-\x7E\s]/g, '')
            .trim();
            
        console.log(`[KB PROCESSOR] ✅ Successfully extracted ${cleanedText.length} characters.`);
        
        return cleanedText.slice(0, 15000);
    } catch (e: any) {
        console.error("[KB PROCESSOR] Error parsing PDF:", e.message);
        throw new Error(e.message || "Failed to parse company profile PDF.");
    }
}

/**
 * Auto-Scrape Identity
 */
import { scrapeAboutPage } from './search_service';
export async function scrapeUserIdentity(url: string): Promise<{ company_name?: string, services?: string, bio?: string }> {
    try {
        const text = await scrapeAboutPage(url);
        return { bio: text.slice(0, 5000) };
    } catch (e: any) {
        console.error("[KB PROCESSOR] Failed to scrape user website:", e.message);
        return { bio: "" };
    }
}
