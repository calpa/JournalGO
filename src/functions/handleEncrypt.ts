import { deriveAESKeyFromSignature } from "../functions/deriveAESKeyFromSignature";
import { encryptText } from "../functions/encryptText";
import { useSignTypedData } from "@privy-io/react-auth";
import { inputObject } from "../constants/messageInputObject";

type SignTypedData = ReturnType<typeof useSignTypedData>["signTypedData"];

interface EncryptResult {
  cipher: string;
  iv: string;
}

/**
 * Handles the encryption process for plaintext.
 * @param {SignTypedData} signTypedData - Function to sign typed data.
 * @param {string} plaintext - The text to be encrypted.
 * @returns {Promise<EncryptResult>}
 */
export async function handleEncrypt(
  signTypedData: SignTypedData,
  plaintext: string
): Promise<EncryptResult> {
  try {
    const { signature } = await signTypedData(inputObject);
    const key = await deriveAESKeyFromSignature(signature);
    const { cipher, iv } = await encryptText(plaintext, key);
    return { cipher, iv };
  } catch (error) {
    console.error("Encryption failed:", error);
    return { cipher: "", iv: "" };
  }
}
