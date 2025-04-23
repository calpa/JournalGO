export function getJournalSignMessage(
  entryHash: string,
  timestamp: number
): string {
  return [
    "🔐 Sign to generate your encryption key",
    `Entry Hash: ${entryHash}`,
    `Timestamp: ${timestamp}`,
    "",
    "This signature will be used to derive a private key to encrypt your journal.",
    "No blockchain transaction or gas will be used.",
    "",
    "— JournalGO",
  ].join("\n");
}

/**
 * Derives an AES symmetric encryption key from a user's wallet signature.
 * The user signs a fixed message, and the resulting signature is used to generate the key.
 *
 * @param {string} entryHash - The hash of the journal entry.
 * @param {number} timestamp - The timestamp of the journal entry.
 * @returns {Promise<`0x${string}>} A Promise that resolves to the SHA256-derived AES key string.
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
