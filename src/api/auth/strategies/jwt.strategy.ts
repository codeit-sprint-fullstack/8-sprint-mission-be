// TODO: implement
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback,
  VerifiedCallback,
} from "passport-jwt";
import { getUserById } from "../auth.service";
import { Request } from "express";
import { envConstants } from "../../../config/config";

const { JWT_SECRET } = envConstants;

const accessTokenOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const cookieExtractor = function (req: Request) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["refreshToken"];
  }
  return token;
};

const refreshTokenOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET,
};

interface payloadType {
  userId: string;
}

async function jwtVerify(payload: payloadType, done: VerifiedCallback) {
  try {
    const user = await getUserById(payload.userId);
    if (!user) {
      return done(null, null);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

export const accessTokenStrategy = new JwtStrategy(
  accessTokenOptions,
  jwtVerify
);
export const refreshTokenStrategy = new JwtStrategy(
  refreshTokenOptions,
  jwtVerify
);
