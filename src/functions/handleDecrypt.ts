import { deriveAESKeyFromSignature } from "../functions/deriveAESKeyFromSignature";
import { decryptText } from "../functions/decryptText";
import { useSignTypedData } from "@privy-io/react-auth";
import { inputObject } from "../constants/messageInputObject";

type SignTypedData = ReturnType<typeof useSignTypedData>["signTypedData"];

/**
 * Handles the decryption process for encrypted text.
 * @param {SignTypedData} signTypedData - Function to sign typed data.
 * @param {string} cipher - The encrypted text.
 * @param {string} iv - Initialization vector used for encryption.
 * @returns {Promise<string>}
 */
export async function handleDecrypt(
  signTypedData: SignTypedData,
  cipher: string,
  iv: string
): Promise<string> {
  try {
    const { signature } = await signTypedData(inputObject);
    const key = await deriveAESKeyFromSignature(signature);
    const decrypted = await decryptText(cipher, iv, key);
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return "Decryption failed";
  }
}
