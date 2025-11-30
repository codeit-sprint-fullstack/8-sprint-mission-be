"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductRequestStruct = void 0;
const superstruct_1 = require("superstruct");
exports.CreateProductRequestStruct = (0, superstruct_1.object)({
    name: (0, superstruct_1.coerce)((0, superstruct_1.nonempty)((0, superstruct_1.string)()), (0, superstruct_1.string)(), (value) => value.trim()),
    description: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    price: (0, superstruct_1.min)((0, superstruct_1.integer)(), 0),
    tags: (0, superstruct_1.array)((0, superstruct_1.nonempty)((0, superstruct_1.string)())),
    images: (0, superstruct_1.array)((0, superstruct_1.nonempty)((0, superstruct_1.string)())),
});
