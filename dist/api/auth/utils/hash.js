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
exports.password = void 0;
exports.hashPassword = hashPassword;
exports.isHashed = isHashed;
exports.verifyPassword = verifyPassword;
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
//"콜백  기반 비동기 함수"를 "promise 기반 비동기 함수"로 바꾸는 함수.
const scrypt = (0, node_util_1.promisify)(node_crypto_1.scrypt);
const PREFIX = "scrypt";
function hashPassword(plain) {
    return __awaiter(this, void 0, void 0, function* () {
        if (plain.length === 0) {
            throw new Error("Password must be a non-empty string");
        }
        const salt = (0, node_crypto_1.randomBytes)(16);
        const keyLen = 64;
        const derivedKey = yield scrypt(plain, salt, keyLen);
        const saltB64 = salt.toString("base64");
        const hashB64 = Buffer.from(derivedKey).toString("base64");
        return `${PREFIX}$${saltB64}$${hashB64}`;
    });
}
function isHashed(stored) {
    return stored.startsWith(`${PREFIX}$`);
}
function verifyPassword(plain, stored) {
    return __awaiter(this, void 0, void 0, function* () {
        if (stored.length === 0)
            return false;
        if (!isHashed(stored)) {
            return plain === stored;
        }
        try {
            const [, saltB64, hashB64] = stored.split("$");
            if (!saltB64 || !hashB64)
                return false;
            const salt = Buffer.from(saltB64, "base64");
            const saved = Buffer.from(hashB64, "base64");
            const keyLen = saved.length || 64;
            const derivedKey = Buffer.from((yield scrypt(plain, salt, keyLen)));
            if (derivedKey.length !== saved.length)
                return false;
            return (0, node_crypto_1.timingSafeEqual)(derivedKey, saved);
        }
        catch (_a) {
            return false;
        }
    });
}
exports.password = { hashPassword, verifyPassword, isHashed };
/*
해설

password는 DB에 저장할 때, DB관리자도 알수 없어야 한다.
그래서 해시(scrypt)를 하는데,
hash 방식으로 암호화한 값과,
암호화에 사용한 키(salt)를 함께 저장한다. (-> 정홧히는 복호화하지 않기 때문에 "암호화"와는 다른 개념이다.)

(base64형식으로 압축하여 저장한다.)
(base64형식으로 변형된 string를 되돌리는데 사용하는 것이 buffer)
*/
//# sourceMappingURL=hash.js.map