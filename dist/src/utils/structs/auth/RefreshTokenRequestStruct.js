"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRequestStruct = void 0;
const superstruct_1 = require("superstruct");
exports.RefreshTokenRequestStruct = (0, superstruct_1.object)({
    refreshToken: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
});
