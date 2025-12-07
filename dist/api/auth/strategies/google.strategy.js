"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: implement
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_service_1 = require("../auth.service");
const config_1 = require("../../../config/config");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = config_1.envConstants;
const googleStrategyOptions = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
};
function verify(accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = profile.emails
            ? profile.emails.length > 0
                ? profile.emails[0]
                : ""
            : "";
        const user = yield (0, auth_service_1.oauthCreateOrUpdate)(profile.provider, profile.id, email && email.value, profile.displayName);
        done(null, user);
    });
}
const googleStrategy = new passport_google_oauth20_1.Strategy(googleStrategyOptions, verify);
exports.default = googleStrategy;
//# sourceMappingURL=google.strategy.js.map