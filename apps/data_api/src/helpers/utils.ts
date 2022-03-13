import crypto from "crypto";

export const generateOTP = () => {
  const chars = "0123456789";
  const max = Math.floor(256 / chars.length) * chars.length;
  const size = 6;

  let ret = "";
  while (ret.length < size) {
    const buf = crypto.pseudoRandomBytes(size - ret.length);
    for (let i = 0; i < buf.length; i++) {
      const x = buf.readUInt8(i);
      if (x < max) {
        ret += chars[x % chars.length];
      }
    }
  }
  return ret;
};
