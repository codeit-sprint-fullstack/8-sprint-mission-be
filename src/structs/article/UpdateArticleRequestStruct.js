import { coerce, object, optional, string } from "superstruct";

export const UpdateArticleRequestStruct = object({
  title: optional(coerce(string(), string(), (value) => value.trim())),
  content: optional(string()),
});
