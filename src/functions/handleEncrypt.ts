// src/functions/handleEncrypt.ts

import { deriveAESKeyFromSignature } from "../functions/deriveAESKeyFromSignature";
import { encryptText } from "../functions/encryptText";
import { useSignTypedData } from "@privy-io/react-auth";
import { generateInputObject } from "../constants/messageInputObject";
import { Address } from "viem";

type SignTypedData = ReturnType<typeof useSignTypedData>["signTypedData"];

interface EncryptResult {
  cipher: string;
  iv: string;
  timestamp: number;
}

/**
 * Handles the encryption process for plaintext.
 * @param {SignTypedData} signTypedData - Function to sign typed data.
 * @param {Address} user - User's address.
 * @param {number} timestamp - Timestamp of the entry.
 * @param {string} plaintext - The text to be encrypted.
 * @returns {Promise<EncryptResult>}
 */
export async function handleEncrypt(
  signTypedData: SignTypedData,
  user: Address,
  timestamp: number,
  plaintext: string
): Promise<EncryptResult> {
  try {
    const { signature } = await signTypedData(
      generateInputObject(user, timestamp)
    );
    const key = await deriveAESKeyFromSignature(signature);
    const { cipher, iv } = await encryptText(plaintext, key);
    return { cipher, iv, timestamp };
  } catch (error) {
    console.error("Encryption failed:", error);
    return { cipher: "", iv: "", timestamp: 0 };
  }
}
