"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordRequestStruct = void 0;
const superstruct_1 = require("superstruct");
exports.UpdatePasswordRequestStruct = (0, superstruct_1.object)({
    password: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    passwordConfirmation: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    currentPassword: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
});
