import { string, trim } from "superstruct";

export const CreateArticleRequestStruct = {
  title: trim(string()),
  content: trim(string()),
};
