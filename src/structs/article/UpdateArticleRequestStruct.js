import { string, trim, optional } from "superstruct";

export const UpdateArticleRequestStruct = {
  title: optional(trim(string())),
  content: optional(trim(string())),
};
