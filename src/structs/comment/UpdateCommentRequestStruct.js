import { coerce, object, optional, string } from "superstruct";

export const UpdateCommentRequestStruct = object({
  content: optional(coerce(string(), string(), (value) => value.trim())),
});
