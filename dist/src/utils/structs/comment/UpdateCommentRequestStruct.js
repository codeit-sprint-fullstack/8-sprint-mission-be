"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentRequestStruct = void 0;
const superstruct_1 = require("superstruct");
const CreateCommentRequestStruct_1 = require("./CreateCommentRequestStruct");
exports.UpdateCommentRequestStruct = (0, superstruct_1.partial)(CreateCommentRequestStruct_1.CreateCommentRequestStruct);
