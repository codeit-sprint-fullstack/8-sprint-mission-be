"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductListRequestStruct = void 0;
const superstruct_1 = require("superstruct");
exports.GetProductListRequestStruct = (0, superstruct_1.object)({
    page: (0, superstruct_1.defaulted)((0, superstruct_1.coerce)((0, superstruct_1.min)((0, superstruct_1.integer)(), 1), (0, superstruct_1.string)(), (value) => Number.parseInt(value, 10)), 1),
    pageSize: (0, superstruct_1.defaulted)((0, superstruct_1.coerce)((0, superstruct_1.max)((0, superstruct_1.min)((0, superstruct_1.integer)(), 1), 12), (0, superstruct_1.string)(), (value) => Number.parseInt(value, 10)), 10),
    orderBy: (0, superstruct_1.defaulted)((0, superstruct_1.enums)(['recent', 'favorite']), 'recent'),
    keyword: (0, superstruct_1.optional)((0, superstruct_1.nonempty)((0, superstruct_1.string)())),
});
