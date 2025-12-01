// TODO: implement
import GoogleStrategy from 'passport-google-oauth20';
import { oauthCreateOrUpdate } from '../auth.service.js';

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

async function verify(accessToken, refreshToken, profile, done) {
  // console.log("유저 이름: " + profile.displayName);
  // console.log("유저 email: " + profile.emails[0].value);
  // console.log("유저 id: " + profile.id);
  // console.log("유저 프로바이더: " + profile.provider);
  const user = await oauthCreateOrUpdate(
    profile.provider,
    profile.id,
    profile.emails[0].value,
    profile.displayName
  );
  done(null, user);
}

const googleStrategy = new GoogleStrategy(googleStrategyOptions, verify);

export default googleStrategy;
