// TODO: implement
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { oauthCreateOrUpdate } from "../auth.service";
import { envConstants } from "../../../config/config";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = envConstants;

const googleStrategyOptions = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

async function verify(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) {
  const email = profile.emails
    ? profile.emails.length > 0
      ? profile.emails[0]
      : ""
    : "";
  const user = await oauthCreateOrUpdate(
    profile.provider,
    profile.id,
    email && email.value,
    profile.displayName
  );
  done(null, user);
}

const googleStrategy = new GoogleStrategy(googleStrategyOptions, verify);

export default googleStrategy;
