"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthN = AuthN;
const AuthTokenManager_1 = require("./AuthTokenManager");
function AuthN() {
    return function (req, res, next) {
        var _a, _b;
        const jwtToken = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!jwtToken) {
            return res.status(401).send({
                name: 'Unauthorized',
                message: 'JWT token is missing',
            });
        }
        if (!AuthTokenManager_1.AuthTokenManager.isValidAccessToken(jwtToken)) {
            return res.status(401).send({
                name: 'Unauthorized',
                message: 'Invalid JWT token',
            });
        }
        return next();
    };
}
