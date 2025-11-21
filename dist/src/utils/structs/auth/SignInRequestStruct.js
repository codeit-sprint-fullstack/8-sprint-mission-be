"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRequestStruct = void 0;
const superstruct_1 = require("superstruct");
const is_email_1 = __importDefault(require("is-email"));
exports.SignInRequestStruct = (0, superstruct_1.object)({
    email: (0, superstruct_1.define)('Email', is_email_1.default),
    password: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
});
