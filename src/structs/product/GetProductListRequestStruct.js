import { integer, string, optional, defaulted } from "superstruct";

export const GetProductListRequestStruct = {
  skip: defaulted(integer(), 0),
  take: defaulted(integer(), 10),
  orderBy: defaulted(string(), "recent"),
  word: optional(string()),
};
