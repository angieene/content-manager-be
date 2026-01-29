import * as crypto from 'crypto';

export class EncryptionUtil {
  private algorithm = 'aes-256-gcm';
  private key: Buffer;

  constructor() {
    const secretKey = process.env.ENCRYPTION_KEY;

    if (!secretKey) {
      throw new Error('ENCRYPTION_KEY environment variable is not set');
    }

    if (secretKey.length !== 64) {
      throw new Error('ENCRYPTION_KEY must be 64 characters (32 bytes in hex)');
    }

    this.key = Buffer.from(secretKey, 'hex');
  }

  /**
   * Encrypt a string using AES-256-GCM
   * @param text - Plain text to encrypt
   * @returns Encrypted string in format: iv:authTag:encryptedData
   */
  encrypt(text: string): string {
    if (!text) {
      return text;
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv) as crypto.CipherGCM;

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    // Return iv + authTag + encrypted data (all in hex, separated by colons)
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  /**
   * Decrypt a string encrypted with encrypt()
   * @param encryptedData - Encrypted string in format: iv:authTag:encryptedData
   * @returns Decrypted plain text
   */
  decrypt(encryptedData: string): string {
    if (!encryptedData) {
      return encryptedData;
    }

    const parts = encryptedData.split(':');

    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv) as crypto.DecipherGCM;
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
