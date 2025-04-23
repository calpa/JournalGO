/**
 * Decrypts the given cipher text using AES-GCM decryption.
 * @param {string} cipher - The base64 encoded cipher text.
 * @param {string} iv - The base64 encoded initialization vector.
 * @param {CryptoKey} key - The CryptoKey used for decryption.
 * @returns {Promise<string>} The decrypted text content.
 */
export async function decryptText(
  cipher: string,
  iv: string,
  key: CryptoKey
): Promise<string> {
  const dec = new TextDecoder();
  const ivArray = Buffer.from(iv, "base64");
  const cipherArray = Buffer.from(cipher, "base64");

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivArray },
    key,
    cipherArray
  );

  return dec.decode(decrypted);
}
