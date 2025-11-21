"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentRequestStruct = void 0;
const superstruct_1 = require("superstruct");
exports.CreateCommentRequestStruct = (0, superstruct_1.object)({
    content: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
});
