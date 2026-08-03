import crypto from 'crypto';
import os from 'os';

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET 
  ? crypto.scryptSync(process.env.ENCRYPTION_SECRET, 'sovereign_salt', 32)
  : crypto.scryptSync('SOVEREIGN_FALLBACK_KEY_2026', 'sovereign_salt', 32);

const IV_LENGTH = 16;

export function encryptSecret(text) {
  if (!text) return text;
  if (text.startsWith('enc_v1:')) return text; 
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `enc_v1:${iv.toString('hex')}:${encrypted}`;
  } catch (e) {
    console.error('[CRYPTO] Encryption failed:', e);
    return text;
  }
}

export function decryptSecret(text) {
  if (!text || typeof text !== 'string') return text;
  if (!text.startsWith('enc_v1:')) return text;
  try {
    const parts = text.split(':');
    if (parts.length !== 3) return text;
    const iv = Buffer.from(parts[1], 'hex');
    const encryptedText = parts[2];
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    console.error('[CRYPTO] Decryption failed:', e);
    return text;
  }
}

export const encryptLocalSecret = encryptSecret;
export const decryptLocalSecret = decryptSecret;
export const getLocalCryptoKey = () => ENCRYPTION_KEY;

export function getHardwareFingerprint() {
  try {
    const cpus = os.cpus();
    const cpuModel = cpus.length > 0 ? cpus[0].model : 'GENERIC_CPU';
    const totalMem = os.totalmem();
    const hostname = os.hostname();
    const networkInterfaces = os.networkInterfaces();
    let mac = '';
    for (const key of Object.keys(networkInterfaces)) {
      for (const net of networkInterfaces[key]) {
        if (!net.internal && net.mac && net.mac !== '00:00:00:00:00:00') {
          mac = net.mac;
          break;
        }
      }
      if (mac) break;
    }
    const raw = `${cpuModel}_${totalMem}_${hostname}_${mac}`;
    return crypto.createHash('sha256').update(raw).digest('hex').substring(0, 32).toUpperCase();
  } catch {
    return 'HW_FINGERPRINT_DEFAULT';
  }
}

export const getDeviceId = getHardwareFingerprint;
