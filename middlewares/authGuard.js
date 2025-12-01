import { expressjwt } from 'express-jwt';

//액세스 토큰 인증 미들웨어
export const verifyAccessToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  //따로 설정이 없으면, Authentication Header에서 값을 찾는다.
});

// 리프레쉬 토큰 인증 미들웨어
export const verifyRefreshToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  getToken: (req) => req.cookies.refreshToken, //쿠키에서 값을 찾도록 하는 설정.
});

//중요 로직
//expressjwt는 토큰 인증에 성공하면 req.auth에 payload(식별 정보 => 유저정보)에 해당하는 정보를 넣어서 넘긴다.
//next() 미들웨어에서는 userId를 받아올 수 있게 된다.
