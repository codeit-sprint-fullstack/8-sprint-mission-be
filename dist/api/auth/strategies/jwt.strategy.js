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
exports.refreshTokenStrategy = exports.accessTokenStrategy = void 0;
// TODO: implement
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("../auth.service");
const config_1 = require("../../../config/config");
const { JWT_SECRET } = config_1.envConstants;
const accessTokenOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};
const cookieExtractor = function (req) {
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
function jwtVerify(payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, auth_service_1.getUserById)(payload.userId);
            if (!user) {
                return done(null, null);
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    });
}
exports.accessTokenStrategy = new passport_jwt_1.Strategy(accessTokenOptions, jwtVerify);
exports.refreshTokenStrategy = new passport_jwt_1.Strategy(refreshTokenOptions, jwtVerify);
//# sourceMappingURL=jwt.strategy.js.map