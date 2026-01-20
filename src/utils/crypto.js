const CryptoJS = require("crypto-js");

// Usa la variable de entorno o una por defecto para dev
const SECRET_KEY = process.env.ENCRYPTION_KEY || "clave_secreta_local_123";

const encryptData = (text) => {
  if (!text) return null; // Si no hay dato, no hace nada
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

const decryptData = (cipherText) => {
  if (!cipherText) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || null;
  } catch (error) {
    console.error("Error desencriptando:", error);
    return cipherText; // Retorna el original si falla (por si acaso no estaba encriptado)
  }
};

module.exports = { encryptData, decryptData };