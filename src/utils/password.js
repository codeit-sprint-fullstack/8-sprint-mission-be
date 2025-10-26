import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * 비밀번호 해시화
 * @param {string} password - 평문 비밀번호
 * @returns {Promise<string>} 해시화된 비밀번호
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * 비밀번호 검증
 * @param {string} password - 평문 비밀번호
 * @param {string} hashedPassword - 해시화된 비밀번호
 * @returns {Promise<boolean>} 일치 여부
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
