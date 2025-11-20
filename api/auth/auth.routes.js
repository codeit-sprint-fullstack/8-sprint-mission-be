import { Router } from 'express';
import passport from './utils/passport.js';
import { verifyAccessToken, verifyRefreshToken } from '../../middlewares/authGuard.js';
import {
  signup,
  login,
  logout,
  refresh,
  oauthLogin,
  setRefreshToken,
  check,
} from './auth.controller.js';

const router = Router();

/* 일반 (이메일/패스워드) 회원가입/로그인 ---*/
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', verifyRefreshToken, refresh); //리프레쉬 토큰 인증 필요.
router.post('/check', check);

//**액세스 토큰 인증을 통해 리프레쉬 토큰을 받아오는 기괴한 엔드포인트
router.post('/getrefresh', verifyAccessToken, setRefreshToken); //액세스 토큰 인증 필요.

/* --- 구글 소셜 로그인(회원가입) --- */
//구글 로그인 페이지로 이동시키는 라우터
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }) // 구글 인증 미들웨어 - 세션을 사용하지 않도록 명시
);

//로그인 성공시 리디렉션 라우터
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }), // 구글 인증 미들웨어 - 세션을 사용하지 않도록 명시
  oauthLogin
);

//테스트용 엔드포인트
router.get('/test', (req, res) => {
  return res.json({ test: '테스트' });
});

export default router;
