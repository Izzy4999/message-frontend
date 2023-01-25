import CryptoJS from "crypto-js";

const decrypted = (text) => {
  const bytes = CryptoJS.AES.decrypt(text, "secret key 123");
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export default decrypted;
