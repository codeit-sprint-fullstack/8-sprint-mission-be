import { Request, Response, NextFunction } from "express";
import {
  createToken,
  refreshAccessToken,
  isValidEmail,
  isValidToken,
} from "./utils/token";
import { createUser, getUser, updateUser } from "./auth.service";
import { CookieOptions, ErrorWithCode } from "../../config/config";
import {
  ERROR_UNATHORIZED,
  ERROR_INVALID_ACCESSTOKEN_FORM,
  ERROR_INVALID_EMAIL_FORM,
  ERROR_INVALID_LOGIN_FORM,
  ERROR_INVALID_SIGNUP_FORM,
  ERROR_USER_NOTFOUND,
  ERROR_OAUTH_USERID,
} from "../../config/errorTemplate";

//signup - 회원가입 email/pw/name -> 새로운 유저 생성.
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw ERROR_INVALID_SIGNUP_FORM;
    }
    if (!isValidEmail(email)) {
      throw ERROR_INVALID_EMAIL_FORM;
    }
    const user = {
      name: name as string,
      email: email as string,
      password: password as string,
    };
    //createUesr()는 user를 파라미터로 받으므로 {}로 넘겨준다.
    const result = await createUser(user);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

//login - email/pw를 이용해 엑세스 토큰 생성, 리프레시 토큰 세션/쿠키 포함.
export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw ERROR_INVALID_LOGIN_FORM;
    }

    if (!isValidEmail(email)) {
      throw ERROR_INVALID_EMAIL_FORM;
    }

    const user = await getUser(email, password); //실패 시 함수 안에서 에러 throw
    if (user?.id) {
      const accessToken = createToken(user.id);
      const refreshToken = createToken(user.id, "refresh");

      await updateUser(user.id, { refreshToken });
      res.cookie("refreshToken", refreshToken, CookieOptions);
      res.status(200).json({ ...user, accessToken });
    } else {
      throw ERROR_USER_NOTFOUND;
    }
  } catch (error) {
    next(error);
  }
}

//logout - 리프레쉬 토큰을 쿠키에서 지웁니다. (액세스 토큰 지우는 건 프론트에서 처리)
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("refreshToken", CookieOptions);
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
}

//refresh - 리프레쉬 토큰이 있을 경우, 액세스/리프레쉬 토큰 재발급
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies.refreshToken;
    const userId = req.auth?.userId;
    if (userId) {
      const newAccessToken = await refreshAccessToken(userId, refreshToken);
      const newRefreshToken = createToken(userId, "refresh"); //액세스 토큰 갱신과 함께 리프레쉬 토큰도 갱신. 무한로그인 유지
      await updateUser(userId, { refreshToken: newRefreshToken });
      res.cookie("refreshToken", newRefreshToken, CookieOptions);

      return res.status(200).json({
        ok: true,
        accessToken: newAccessToken,
      });
    } else {
      const error = new Error("유저 인증 오류") as ErrorWithCode;
      error.code = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

export async function check(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      if (!authHeader.startsWith("Bearer ")) {
        throw ERROR_INVALID_ACCESSTOKEN_FORM;
      }
      const accessToken = authHeader.split(" ")[1];
      if (!isValidToken(accessToken)) {
        throw ERROR_UNATHORIZED;
      }
    } else {
      throw ERROR_INVALID_ACCESSTOKEN_FORM;
    }
    return res.status(200).json({ authenticated: true });
  } catch (error) {
    const e = error as ErrorWithCode;
    return res.status(e.code || 500).json({ authenticated: false });
  }
}

export async function oauthLogin(
  req: Request<{
    user: {
      id: string;
    };
  }>,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      throw ERROR_OAUTH_USERID;
    }
    const { id: userId } = req.user;
    const accessToken = createToken(userId);
    const refreshToken = createToken(userId, "refresh");
    res.cookie("refreshToken", refreshToken, CookieOptions);
    res.redirect(`http://localhost:3000/oauth?accessToken=${accessToken}`);
  } catch (err) {
    next(err);
  }
}
