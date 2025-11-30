"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommentListRequestStruct = void 0;
const superstruct_1 = require("superstruct");
exports.GetCommentListRequestStruct = (0, superstruct_1.object)({
    cursor: (0, superstruct_1.defaulted)((0, superstruct_1.coerce)((0, superstruct_1.min)((0, superstruct_1.integer)(), 0), (0, superstruct_1.string)(), (value) => Number.parseInt(value, 10)), 0),
    take: (0, superstruct_1.defaulted)((0, superstruct_1.coerce)((0, superstruct_1.max)((0, superstruct_1.min)((0, superstruct_1.integer)(), 1), 10), (0, superstruct_1.string)(), (value) => Number.parseInt(value, 10)), 10),
});
