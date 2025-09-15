import { integer, optional, defaulted } from "superstruct";

export const GetCommentListRequestStruct = {
  cursor: optional(integer()),
  take: defaulted(integer(), 10),
};
