import { object, optional, defaulted, integer, string } from 'superstruct';

export const GetArticleListRequestStruct = object({
  cursor: optional(integer()),
  take: defaulted(integer(), 10),
  orderBy: defaulted(string(), "recent"),
  word: optional(string()),
});
