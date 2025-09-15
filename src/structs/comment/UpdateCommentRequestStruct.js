import { string, trim, optional } from "superstruct";

export const UpdateCommentRequestStruct = {
  content: optional(trim(string())),
};
