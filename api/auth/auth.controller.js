import {
  createToken,
  refreshAccessToken,
  isValidEmail,
  isValidToken,
} from "./utils/token.js";
import {
  createUser,
  getUser,
  getUserById,
  updateUser,
} from "./auth.service.js";

const refreshTokenCookieOptions = {
  path: "/auth/refresh", //쿠키 경로 고정.
  httpOnly: true, //JS 접근 불가
  secure: false, //로컬 실험용. -> 배포 true
  sameSite: "Lax", //로컬 실험용. -> 배포 'None'
};

//signup - 회원가입 email/pw/name -> 새로운 유저 생성.
export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = new Error("name, email, password 가 모두 필요합니다.");
      error.code = 422;
      throw error;
    }

    if (!isValidEmail(email)) {
      const error = new Error("email 형식이 올바르지 않습니다.");
      error.code = 422;
      throw error;
    }

    //createUesr()는 user를 파라미터로 받으므로 {}로 넘겨준다.
    const result = await createUser({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

//login - email/pw를 이용해 엑세스 토큰 생성, 리프레시 토큰 세션/쿠키 포함.
export async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      const error = new Error("email, password 가 모두 필요합니다.");
      error.code = 422;
      throw error;
    }

    if (!isValidEmail(email)) {
      const error = new Error("email 형식이 올바르지 않습니다.");
      error.code = 422;
      throw error;
    }

    const user = await getUser(email, password); //실패 시 함수 안에서 에러 throw
    const accessToken = createToken(user);
    const refreshToken = createToken(user, "refresh");

    await updateUser(user.id, { refreshToken });
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.status(200).json({ ...user, accessToken });
  } catch (error) {
    next(error);
  }
}

//logout - 리프레쉬 토큰을 쿠키에서 지웁니다. (액세스 토큰 지우는 건 프론트에서 처리)
export async function logout(req, res, next) {
  try {
    res.clearCookie("refreshToken", refreshTokenCookieOptions);
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

//refresh - 리프레쉬 토큰이 있을 경우, 액세스/리프레쉬 토큰 재발급
export async function refresh(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const userId = req.auth?.userId || req.user?.id;
    const newAccessToken = await refreshAccessToken(userId, refreshToken);
    const newRefreshToken = createToken({ id: userId }, "refresh"); //액세스 토큰 갱신과 함께 리프레쉬 토큰도 갱신. 무한로그인 유지
    await updateUser(userId, { refreshToken: newRefreshToken });
    res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      ok: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function check(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader && !authHeader.startsWith("Bearer ")) {
      const error = new Error("token 양식 오류.");
      error.code = 401;
      throw error;
    }
    const accessToken = authHeader.split(" ")[1];
    if (!isValidToken(accessToken)) {
      const error = new Error("UnauthorizedError");
      error.code = 403;
      throw error;
    }
    return res.status(200).json({ authenticated: true });
  } catch (error) {
    return res.status(403).json({ authenticated: false });
  }
}

export async function oauthLogin(req, res, next) {
  try {
    const { id } = req.user;
    const user = await getUserById(id); //실패 시 함수 안에서 에러 throw
    const accessToken = createToken(user);
    const refreshToken = createToken(user, "refresh");
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.redirect(`http://localhost:3000/oauth?accessToken=${accessToken}`);
  } catch (err) {
    next(err);
  }
}
