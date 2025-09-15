import { string, trim } from "superstruct";

export const CreateCommentRequestStruct = {
  content: trim(string()),
};
