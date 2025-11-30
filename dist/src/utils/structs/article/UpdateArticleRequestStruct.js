"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleRequestStruct = void 0;
const superstruct_1 = require("superstruct");
const CreateArticleRequestStruct_1 = require("./CreateArticleRequestStruct");
exports.UpdateArticleRequestStruct = (0, superstruct_1.partial)(CreateArticleRequestStruct_1.CreateArticleRequestStruct);
