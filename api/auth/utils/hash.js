import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb);
const PREFIX = "scrypt";

export async function hashPassword(plain) {
  if (typeof plain !== "string" || plain.length === 0) {
    throw new Error("Password must be a non-empty string");
  }
  const salt = randomBytes(16);
  const keyLen = 64;
  const derivedKey = await scrypt(plain, salt, keyLen);
  const saltB64 = salt.toString("base64");
  const hashB64 = Buffer.from(derivedKey).toString("base64");
  return `${PREFIX}$${saltB64}$${hashB64}`;
}

export function isHashed(stored) {
  return typeof stored === "string" && stored.startsWith(`${PREFIX}$`);
}

export async function verifyPassword(plain, stored) {
  if (typeof stored !== "string" || stored.length === 0) return false;
  if (!isHashed(stored)) {
    return plain === stored;
  }
  try {
    const [, saltB64, hashB64] = stored.split("$");
    if (!saltB64 || !hashB64) return false;
    const salt = Buffer.from(saltB64, "base64");
    const saved = Buffer.from(hashB64, "base64");
    const keyLen = saved.length || 64;
    const derivedKey = Buffer.from(await scrypt(plain, salt, keyLen));
    if (derivedKey.length !== saved.length) return false;
    return timingSafeEqual(derivedKey, saved);
  } catch {
    return false;
  }
}

export const password = { hashPassword, verifyPassword, isHashed };

/*
해설

password는 DB에 저장할 때, DB관리자도 알수 없어야 한다.
그래서 해시(scrypt)를 하는데, 
hash 방식으로 암호화한 값과,
암호화에 사용한 키(salt)를 함께 저장한다. (-> 정홧히는 복호화하지 않기 때문에 "암호화"와는 다른 개념이다.)

(base64형식으로 압축하여 저장한다.)
(base64형식으로 변형된 string를 되돌리는데 사용하는 것이 buffer)
*/
