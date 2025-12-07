import jwt from "jsonwebtoken";
import repo from "../auth.repository";
import { envConstants } from "../../../config/config";
import { ERROR_INVALID_REFRESHTOKEN } from "../../../config/errorTemplate";

const { JWT_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } =
  envConstants;

type Unit = "y" | "w" | "d" | "h" | "m" | "s";
type StringValue = `${number}` | `${number}${Unit}` | `${number} ${Unit}`;

// Access, Referresh token 발급
export function createToken(
  userId: string,
  type: "access" | "refresh" = "access"
) {
  const payload = { userId };
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const JWT_SECRET: string = process.env.JWT_SECRET;
  const expiresTime =
    type === "refresh" ? JWT_REFRESH_EXPIRES_IN : JWT_ACCESS_EXPIRES_IN;
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresTime as StringValue,
  });
  return token;
}

export async function refreshAccessToken(userId: string, refreshToken: string) {
  const user = await repo.findById(userId);
  //리프레쉬 토큰이 유효하지 않으면 업데이트 불가
  if (!user || user.refreshToken !== refreshToken) {
    throw ERROR_INVALID_REFRESHTOKEN;
  }
  const newAccessToken = createToken(user.id);
  return newAccessToken;
}

export function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidToken(token: string) {
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
