// src/functions/deriveAESKeyFromSignature.ts

/**
 * Derives an AES symmetric encryption key from a user's wallet signature.
 * The user signs a fixed message, and the resulting signature is used to generate the key.
 *
 * @param {string} signature - The signature of the journal entry.
 * @returns {Promise<CryptoKey>} A Promise that resolves to the AES-GCM CryptoKey.
 */
export async function deriveAESKeyFromSignature(
  signature: string
): Promise<CryptoKey> {
  const rawKey = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(signature)
  );

  return await crypto.subtle.importKey("raw", rawKey, "AES-GCM", false, [
    "encrypt",
    "decrypt",
  ]);
}
