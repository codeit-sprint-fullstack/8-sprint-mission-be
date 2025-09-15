import { object, optional, defaulted, integer, string } from "superstruct";

export const GetProductListRequestStruct = object({
  skip: defaulted(integer(), 0),
  take: defaulted(integer(), 10),
  orderBy: defaulted(string(), "recent"),
  word: optional(string()),
});
