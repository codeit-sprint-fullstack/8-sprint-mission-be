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
const db_1 = __importDefault(require("../../config/db"));
//유저 테이블 CRUD 함수들.
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default.user.findUnique({
            where: {
                id,
            },
        });
    });
}
function findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.user.findUnique({
            where: {
                email,
            },
        });
    });
}
function save(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
            },
        });
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default.user.update({
            where: {
                id,
            },
            data: data,
        });
    });
}
function createOrUpdate(provider, providerId, email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default.user.upsert({
            where: { provider, providerId },
            update: { email, name },
            create: { provider, providerId, email, name },
        });
    });
}
exports.default = {
    findById,
    findByEmail,
    save,
    update,
    createOrUpdate,
};
//# sourceMappingURL=auth.repository.js.map