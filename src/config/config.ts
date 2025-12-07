//환경변수, 각종 상수, 공용타입 선언 파일입니다.
//어디에 정리해야 될지 몰라서 모아두었습니다.

interface ENV {
  PORT: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

export const envConstants: ENV = {
  PORT: process.env.PORT ?? "",
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ?? "",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
};

type SameSite = "lax" | "strict" | "none";
interface cookieOptopns {
  httpOnly: boolean;
  secure: boolean;
  sameSite: SameSite;
}

function convertToBoolean(boolValue: string | undefined) {
  if (boolValue === "true") return true;
  if (boolValue === "false") return false;
  return null;
}

function checkSameSiteValue(value: string | undefined): SameSite | undefined {
  if (value === "lax" || value === "strict" || value === "none") {
    return value;
  }
  return undefined;
}

const { COOKIE_HTTP_ONLY, COOKIE_SECURE, COOKIE_SAME_SITE } = process.env;
export const CookieOptions: cookieOptopns = {
  httpOnly: convertToBoolean(COOKIE_HTTP_ONLY) || true, //JS 접근 불가
  secure: convertToBoolean(COOKIE_SECURE) || false, //로컬 실험용. -> 배포 true
  sameSite: checkSameSiteValue(COOKIE_SAME_SITE) || "lax", //로컬 실험용. -> 배포 'none'
};

//기본 애러에 code 속성이 없어서 추가했습니다.
export interface ErrorWithCode extends Error {
  code?: number;
  data?: any;
}

export interface userType {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface createUserInput {
  email: string;
  name: string;
  password: string;
}

export interface updateUserInput {
  name?: string;
  password?: string;
  refreshToken?: string;
}
