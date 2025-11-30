"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductRequestStruct = void 0;
const superstruct_1 = require("superstruct");
const CreateProductRequestStruct_1 = require("./CreateProductRequestStruct");
exports.UpdateProductRequestStruct = (0, superstruct_1.partial)(CreateProductRequestStruct_1.CreateProductRequestStruct);
