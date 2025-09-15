import { integer, string, optional, defaulted } from "superstruct";

export const GetArticleListRequestStruct = {
  cursor: optional(integer()),
  take: defaulted(integer(), 10),
  orderBy: defaulted(string(), "recent"),
  word: optional(string()),
};
