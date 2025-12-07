"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const jwt_strategy_1 = require("../strategies/jwt.strategy");
const google_strategy_1 = __importDefault(require("../strategies/google.strategy"));
passport_1.default.use("access-token", jwt_strategy_1.accessTokenStrategy);
passport_1.default.use("refresh-token", jwt_strategy_1.refreshTokenStrategy);
passport_1.default.use("google", google_strategy_1.default);
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map