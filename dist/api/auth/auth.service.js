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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUser = getUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.oauthCreateOrUpdate = oauthCreateOrUpdate;
const errorTemplate_1 = require("../../config/errorTemplate");
const auth_repository_1 = __importDefault(require("./auth.repository"));
const hash_1 = require("./utils/hash");
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existedUser = yield auth_repository_1.default.findByEmail(user.email);
            if (existedUser) {
                throw errorTemplate_1.ERROR_ALREADY_USED_EMAIL;
            } //중복되는 이메일이 있으면 에러(이미 존재하는 유저)
            const hashedPassword = yield (0, hash_1.hashPassword)(user.password); //해시화
            const createdUser = yield auth_repository_1.default.save(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return filterSensitiveUserData(createdUser);
        }
        catch (error) {
            const e = error;
            if (e.code === 400)
                throw error;
            throw errorTemplate_1.ERROR_UNKNOWN;
        }
    });
}
function getUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield auth_repository_1.default.findByEmail(email);
            if (!user) {
                throw errorTemplate_1.ERROR_USER_NOTFOUND;
            }
            if (!user.password) {
                throw errorTemplate_1.ERROR_DATA_NONE;
            }
            yield (0, hash_1.verifyPassword)(password, user.password);
            return filterSensitiveUserData(user);
        }
        catch (error) {
            const e = error;
            if (e.code === 400)
                throw error;
            throw errorTemplate_1.ERROR_UNKNOWN;
        }
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield auth_repository_1.default.findById(id);
            if (!user) {
                throw errorTemplate_1.ERROR_USER_NOTFOUND;
            }
            return filterSensitiveUserData(user);
        }
        catch (error) {
            const e = error;
            if (e.code === 400)
                throw error;
            throw errorTemplate_1.ERROR_UNKNOWN;
        }
    });
}
function updateUser(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield auth_repository_1.default.update(userId, data);
        return filterSensitiveUserData(user);
    });
}
function oauthCreateOrUpdate(provider, providerId, email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield auth_repository_1.default.createOrUpdate(provider, providerId, email, name);
        return filterSensitiveUserData(user);
    });
}
function filterSensitiveUserData(user) {
    const { id, provider, email, name, createdAt } = user;
    return { id, provider, email, name, createdAt };
}
//# sourceMappingURL=auth.service.js.map