import jwt from 'jsonwebtoken';
import repo from '../auth.repository.js';

const { JWT_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = process.env;

// Access, Referresh token 발급
export function createToken(user, type = 'access') {
  const payload = { userId: user.id };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: type === 'refresh' ? JWT_REFRESH_EXPIRES_IN : JWT_ACCESS_EXPIRES_IN,
  });
  return token;
}

export async function refreshAccessToken(userId, refreshToken) {
  const user = await repo.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  // TODO: refreshToken 도 새로 발급하고, 리턴값에 포함시키세요.
  // hint: 객체형태로 반환하세요
  const newAccessToken = createToken(user);
  return newAccessToken;
}

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return !!decoded; // 유효하면 true
  } catch (err) {
    return false; // 만료되었거나 위조된 경우
  }
}

/*
해설

jwt.sign()의 payload에는 
토큰의 주체를 구별하는 id로 사용될 정보가 들어갑니다.
보통 JS객체 형식으로 들어갑니다.
user 정보를 객체로 넣어줘도 되겠지만, 어디서든 복호화 가능한 탓에
민감한 정보는 넣지 않습니다.

여기서는 서버에서 관리하는 유저 id(uuid)를 단순히 넣어주겠습니다.

유효기간은 
{ expriresIn: '1h' } 의 형태로 넣습니다.
 => 1시간 동안 토큰 유효.
*/

//기존 createToken
/*
export function createToken(payload, options = {}) {
    const expiresIn = JWT_ACCESS_EXPIRES_IN;
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn });
}
*/
