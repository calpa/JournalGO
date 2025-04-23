/**
 * Encrypts the given text content using AES-GCM encryption.
 * @param {string} content - The text to be encrypted.
 * @param {CryptoKey} key - The CryptoKey used for encryption.
 * @returns {Promise<{cipher: string, iv: string}>} The encrypted cipher text and initialization vector.
 */
export async function encryptText(
  content: string,
  key: CryptoKey
): Promise<{ cipher: string; iv: string }> {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(content)
  );

  return {
    cipher: Buffer.from(encrypted).toString("base64"),
    iv: Buffer.from(iv).toString("base64"),
  };
}
