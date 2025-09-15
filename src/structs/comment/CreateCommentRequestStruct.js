import { coerce, object, nonempty, string } from "superstruct";

export const CreateCommentRequestStruct = object({
  content: coerce(nonempty(string()), string(), (value) => value.trim()),
});
