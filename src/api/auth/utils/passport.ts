import passport from "passport";
import {
  accessTokenStrategy,
  refreshTokenStrategy,
} from "../strategies/jwt.strategy";
import googleStrategy from "../strategies/google.strategy";

passport.use("access-token", accessTokenStrategy);
passport.use("refresh-token", refreshTokenStrategy);
passport.use("google", googleStrategy);

export default passport;
